import cv2, numpy as np, sys
SC=float(sys.argv[1]) if len(sys.argv)>1 else 1.12
U='/root/.claude/uploads/795a4e5b-6bad-529c-9439-234a26010442/'
src=cv2.imread(U+'3f226727-image.png'); tgt=cv2.imread('work/tgt4.png')
C=np.load('work/segconf.npy').astype(np.float32)
T=np.load('work/tgt_lm.npy')*4
SL=np.load('work/src_lm.npy'); Sp=SL[np.argmax(SL[:,:,0].mean(1))]
H,W=tgt.shape[:2]; sh,sw=src.shape[:2]
yy,xx=np.mgrid[:sh,:sw]; chin=Sp[152]
guy=(xx>Sp[:,0].min()-300)&(yy<chin[1]+150)
hm=(((C[...,1]+C[...,3]+C[...,5])>0.5)&guy).astype(np.uint8)
n,cc=cv2.connectedComponents(hm); hm=(cc==cc[int(Sp[1,1]),int(Sp[1,0])]).astype(np.uint8)
# ears: skin-coloured pixels next to the face, between eyes and mouth height
Ls=cv2.cvtColor(src,cv2.COLOR_BGR2LAB).astype(np.float32)
fm=(C[...,3]>0.6)&guy; mu=Ls[fm].mean(0); sd=Ls[fm].std(0)
d=np.sqrt((((Ls-mu)/sd)**2)[...,1:].sum(-1))
band=(yy>Sp[105,1])&(yy<Sp[13,1])&(xx>Sp[:,0].min()-110)&(xx<Sp[:,0].max()+110)
ear=((d<2.2)&band).astype(np.uint8)
ear=cv2.morphologyEx(ear,cv2.MORPH_OPEN,np.ones((7,7)))
grow=cv2.dilate(hm,np.ones((120,120)))
m=np.maximum(hm,ear*grow)
m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((15,15)))
n,cc=cv2.connectedComponents(m); m=(cc==cc[int(Sp[1,1]),int(Sp[1,0])]).astype(np.float32)
# neck fading into the poster's neck
nk=((C[...,2]>0.5)&(xx>Sp[:,0].min()-40)&(xx<Sp[:,0].max()+40)&(yy<chin[1]+110)).astype(np.float32)*np.clip((chin[1]+110-yy)/110,0,1)
m=np.maximum(m,nk); m=cv2.GaussianBlur(m,(0,0),2.0)
# alignment, then scale up around the face centre
ids=[33,133,362,263,1,61,291,152,10,234,454]
M,_=cv2.estimateAffinePartial2D(Sp[ids].astype(np.float32),T[ids].astype(np.float32))
c=T[ids].mean(0); A=np.vstack([M,[0,0,1]]); S=np.array([[SC,0,c[0]*(1-SC)],[0,SC,c[1]*(1-SC)],[0,0,1]]); M=(S@A)[:2]
hw=cv2.warpAffine(src,M,(W,H),flags=cv2.INTER_AREA); mw=cv2.warpAffine(m,M,(W,H))
fS=cv2.warpAffine((C[...,3]>0.5).astype(np.float32),M,(W,H))>0.5
gS=cv2.warpAffine(((C[...,1]+C[...,5])>0.5).astype(np.float32)*m,M,(W,H))>0.5
# ---- erase the original head from the poster
oh=np.zeros((H,W),np.uint8)
P=T.copy(); top=P[:,1].min(); ctr=P.mean(0)
P2=np.vstack([P,[[P[:,0].min()-20,top-190],[P[:,0].max()+40,top-170],[ctr[0],top-230],[P[:,0].max()+90,P[454,1]],[P[:,0].max()+90,P[454,1]-120]]])
cv2.fillConvexPoly(oh,cv2.convexHull(np.int32(P2)),255)
oh[int(T[152,1])-10:,:]=0                      # keep neck
oh=cv2.bitwise_and(oh,cv2.bitwise_not((mw>0.95).astype(np.uint8)*255)) if False else oh
ohd=cv2.dilate(oh,np.ones((9,9)))
base=cv2.inpaint(tgt,ohd,25,cv2.INPAINT_TELEA).astype(np.float32)
fill=base.copy()
for y in range(H):
    xsr=np.where(ohd[y]>0)[0]
    if len(xsr): 
        xr=min(W-1,xsr.max()+12); fill[y,xsr]=tgt[y,xr]
fill=cv2.GaussianBlur(fill,(0,0),6)
k=cv2.GaussianBlur(ohd.astype(np.float32)/255,(0,0),4)[...,None]
yb=(np.arange(H)[:,None,None]<T[152,1]-60)
base=np.where(yb,base*(1-k)+fill*k,base)
# ---- colour grade the head toward the poster
Lt=cv2.cvtColor(tgt,cv2.COLOR_BGR2LAB).astype(np.float32)
tm=np.zeros((H,W),np.uint8); cv2.fillConvexPoly(tm,cv2.convexHull(np.int32(T)),1); tm=cv2.erode(tm,np.ones((25,25)))>0
Lh=cv2.cvtColor(hw,cv2.COLOR_BGR2LAB).astype(np.float32)
a=Lh[fS]; b=Lt[tm]; o=Lh.copy()
for ch,kc in [(0,0.9),(1,1.0),(2,1.0)]:
    o[...,ch]=(Lh[...,ch]-a[:,ch].mean())*(b[:,ch].std()/a[:,ch].std())*kc+b[:,ch].mean()
o[...,0]=np.where(gS,Lh[...,0]*0.78,o[...,0])          # hair & glasses keep their darkness
o[...,1]=np.where(gS,Lh[...,1]*0.5+0.5*142,o[...,1]); o[...,2]=np.where(gS,Lh[...,2]*0.5+0.5*146,o[...,2])
sk=~gS; o[...,0]=np.where(sk,o[...,0]*0.93,o[...,0]); o[...,1]=np.where(sk,o[...,1]+3,o[...,1]); o[...,2]=np.where(sk,o[...,2]+6,o[...,2])
st=cv2.cvtColor(np.clip(o,0,255).astype(np.uint8),cv2.COLOR_LAB2BGR)
# ---- illustration rendering
p=st
for _ in range(5): p=cv2.bilateralFilter(p,9,18,7)
p=cv2.edgePreservingFilter(p,flags=cv2.RECURS_FILTER,sigma_s=30,sigma_r=0.15).astype(np.float32)
g=cv2.GaussianBlur(cv2.cvtColor(st,cv2.COLOR_BGR2GRAY),(0,0),1.2).astype(np.float32)
dog=cv2.GaussianBlur(g,(0,0),1.0)-cv2.GaussianBlur(g,(0,0),3.0)
ink=np.clip(1+dog/14,0.35,1); ink=np.where(ink>0.8,1,ink)
ib=(ink<1).astype(np.uint8); nn,cc2,stt,_=cv2.connectedComponentsWithStats(ib)
small=np.isin(cc2,np.where(stt[:,4]<60)[0]); ink[small&fS]=1; ink=cv2.GaussianBlur(ink,(0,0),0.8)[...,None]
p=p*ink
det=cv2.bilateralFilter(st,7,25,5).astype(np.float32)
gl=cv2.GaussianBlur(gS.astype(np.float32),(0,0),3)[...,None]
dm=det.mean(-1,keepdims=True); det=(det-dm)*1.0+(cv2.GaussianBlur(dm,(0,0),6)[...,None] if False else dm)*0.8+(dm-cv2.GaussianBlur(dm,(0,0),5)[...,None])*1.4
p=p*(1-gl)+np.clip(det,0,255)*gl
bl=cv2.GaussianBlur(p,(0,0),2.5); p=p*1.35-bl*0.35
# poster lighting
xs=np.arange(W,dtype=np.float32)[None,:]; x0,x1=T[:,0].min(),T[:,0].max(); fw=x1-x0
r=np.clip((xs-(x0+0.70*fw))/(0.40*fw),0,1)**1.3; r=(r*(~gS*0.8+0.2))[...,None]
p=p*(1-0.6*r)+np.array([240,232,255],np.float32)*0.6*r
l=np.clip(((x0+0.2*fw)-xs)/(0.4*fw),0,1)[...,None]
p=p*(1-0.3*l)+np.array([140,70,115],np.float32)*0.3*l
p=np.clip(p*0.9+np.array([175,140,205],np.float32)*0.1,0,255)
p=cv2.GaussianBlur(p,(0,0),0.7)
# ---- sunglasses drawn on top
GP=np.load('work/glass_polys.npy',allow_pickle=True)
lm=np.zeros((sh,sw),np.uint8); am=np.zeros((sh,sw),np.uint8)
for q in GP[:3]: cv2.fillPoly(lm,[np.int32(q)],255,cv2.LINE_AA)
for q in GP[3:]: cv2.fillPoly(am,[np.int32(q)],255,cv2.LINE_AA)
lw=cv2.warpAffine(lm,M,(W,H)).astype(np.float32)/255; aw=cv2.warpAffine(am,M,(W,H)).astype(np.float32)/255
gsrc=cv2.cvtColor(hw,cv2.COLOR_BGR2GRAY).astype(np.float32)
gsrc=cv2.bilateralFilter(gsrc,7,20,5)
ys_,xs_=np.nonzero(lw>0.5); gy0,gy1=ys_.min(),ys_.max(); gx0,gx1=xs_.min(),xs_.max()
yy2,xx2=np.mgrid[:H,:W].astype(np.float32)
tv=np.clip((yy2-gy0)/(gy1-gy0+1),0,1); th=np.clip((xx2-gx0)/(gx1-gx0+1),0,1)
lens=np.array([38,30,34],np.float32)*(1-tv[...,None])+np.array([70,58,72],np.float32)*tv[...,None]
lens=lens+((gsrc-gsrc[lw>0.5].mean())*0.9)[...,None]
# sky reflection streak
streak=np.exp(-((th*1.0-tv*0.55-0.55)/0.07)**2)*(tv<0.75)
lens=lens*(1-0.4*streak[...,None])+np.array([200,175,235],np.float32)*0.4*streak[...,None]
lens=lens*(1-0.2*r)+np.array([235,225,255],np.float32)*0.2*r
p=p*(1-lw[...,None])+np.clip(lens,0,255)*lw[...,None]
arm=np.array([225,215,230],np.float32)*(1-0.3*(1-r))
p=p*(1-aw[...,None])+arm*aw[...,None]
edge=cv2.morphologyEx(((lw+aw)>0.5).astype(np.uint8),cv2.MORPH_GRADIENT,np.ones((3,3))).astype(np.float32)
edge=cv2.GaussianBlur(edge,(0,0),0.7)[...,None]
p=p*(1-0.85*edge)+np.array([30,15,25],np.float32)*0.85*edge
p=hw.astype(np.float32)  # original head, untouched
al=cv2.GaussianBlur(cv2.erode(mw,np.ones((5,5))),(0,0),1.5)[...,None]
comp=np.clip(base*(1-al)+p*al,0,255).astype(np.uint8)
cv2.imwrite('work/v7.png',comp)
y0=max(0,int(T[:,1].min()-300)); xa=int(T[:,0].min()-300)
cv2.imwrite('work/v7_crop.png',comp[y0:y0+720,xa:xa+900])
cv2.imwrite('work/v7_view.jpg',cv2.resize(comp,(1176,660),interpolation=cv2.INTER_AREA))

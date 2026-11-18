import cv2, numpy as np, sys
U='/root/.claude/uploads/795a4e5b-6bad-529c-9439-234a26010442/'
SIG=float(sys.argv[1]) if len(sys.argv)>1 else 10
tgt=cv2.imread('work/tgt4.png').astype(np.float32)
src=cv2.imread(U+'3f226727-image.png').astype(np.float32)
T=np.load('work/tgt_lm.npy')*4
SL=np.load('work/src_lm.npy'); Sp=SL[np.argmax(SL[:,:,0].mean(1))]
h,w=tgt.shape[:2]
# Delaunay on target points
rect=(0,0,w,h); sd=cv2.Subdiv2D(rect)
for p in T: sd.insert((float(p[0]),float(p[1])))
idx={}
tris=[]
for t in sd.getTriangleList():
    pts=t.reshape(3,2); ii=[]
    for p in pts:
        d=np.linalg.norm(T-p,axis=1); j=d.argmin()
        if d[j]<1: ii.append(j)
    if len(ii)==3: tris.append(ii)
warp=np.zeros_like(tgt)
for tri in tris:
    s=Sp[tri].astype(np.float32); d=T[tri].astype(np.float32)
    rs=cv2.boundingRect(s); rd=cv2.boundingRect(d)
    s2=(s-np.float32(rs[:2])).astype(np.float32); d2=(d-np.float32(rd[:2])).astype(np.float32)
    M=cv2.getAffineTransform(s2,d2)
    patch=src[rs[1]:rs[1]+rs[3],rs[0]:rs[0]+rs[2]]
    out=cv2.warpAffine(patch,M,(rd[2],rd[3]),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT)
    m=np.zeros((rd[3],rd[2]),np.float32); cv2.fillConvexPoly(m,np.int32(d2+0.5),1,cv2.LINE_AA)
    roi=warp[rd[1]:rd[1]+rd[3],rd[0]:rd[0]+rd[2]]
    roi[:]=roi*(1-m[...,None])+out*m[...,None]
hull=cv2.convexHull(np.int32(T))
mask=np.zeros((h,w),np.float32); cv2.fillConvexPoly(mask,hull,1)
mask=cv2.erode(mask,np.ones((15,15)))
mask=cv2.GaussianBlur(mask,(0,0),12)[...,None]
# lighting transfer: user's details + target's low-frequency tone
lab_w=cv2.cvtColor(warp.astype(np.uint8),cv2.COLOR_BGR2LAB).astype(np.float32)
lab_t=cv2.cvtColor(tgt.astype(np.uint8),cv2.COLOR_BGR2LAB).astype(np.float32)
m2=(mask[...,0]>0.5)
for c in range(3):
    a=lab_w[...,c][m2]; b=lab_t[...,c][m2]
    lab_w[...,c]=(lab_w[...,c]-a.mean())/(a.std()+1e-6)*b.std()*(0.8 if c==0 else 1)+b.mean()
bw=cv2.GaussianBlur(lab_w,(0,0),SIG); bt=cv2.GaussianBlur(lab_t,(0,0),SIG)
res=lab_w-bw+bt
res[...,0]=lab_w[...,0]-bw[...,0]*0.55+bt[...,0]*0.55
res=np.clip(res,0,255).astype(np.uint8)
face=cv2.cvtColor(res,cv2.COLOR_LAB2BGR).astype(np.float32)
out=tgt*(1-mask)+face*mask
cv2.imwrite('work/swap_raw.png',out.astype(np.uint8))
cv2.imwrite('work/swap_crop.png',out[0:600,1100:1900].astype(np.uint8))
np.save('work/mask.npy',mask)

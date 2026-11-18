import cv2, numpy as np
U='/root/.claude/uploads/795a4e5b-6bad-529c-9439-234a26010442/'
src=cv2.imread(U+'3f226727-image.png'); tgt=cv2.imread('work/tgt4.png')
C=np.load('work/segconf.npy').astype(np.float32)
T=np.load('work/tgt_lm.npy')*4
SL=np.load('work/src_lm.npy'); Sp=SL[np.argmax(SL[:,:,0].mean(1))]
H,W=tgt.shape[:2]
# --- head mask on selfie (only the guy)
head=C[...,1]+C[...,3]+C[...,5]
neck=C[...,2].copy()
yy,xx=np.mgrid[:src.shape[0],:src.shape[1]]
chin=Sp[152]; 
guy=(xx>Sp[:,0].min()-260)&(yy<chin[1]+120)&(yy>Sp[:,1].min()-500)
lab=C.argmax(-1)
# keep the connected component around the guy
hm=((head>0.5)&guy).astype(np.uint8)
n,cc=cv2.connectedComponents(hm); k=cc[int(Sp[1,1]),int(Sp[1,0])]; hm=(cc==k).astype(np.float32)
nk=((neck>0.5)&guy&(yy<chin[1]+120)&(xx>Sp[:,0].min()-60)&(xx<Sp[:,0].max()+60)).astype(np.float32)
fade=np.clip((chin[1]+120-yy)/120,0,1)
m=np.maximum(hm,nk*fade)
m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((9,9)))
m=cv2.GaussianBlur(m,(0,0),2.5)
# --- similarity alignment selfie -> poster
ids=[33,133,362,263,1,61,291,152,10,234,454]
M,_=cv2.estimateAffinePartial2D(Sp[ids].astype(np.float32),T[ids].astype(np.float32))
hw=cv2.warpAffine(src,M,(W,H),flags=cv2.INTER_AREA if M[0,0]<1 else cv2.INTER_CUBIC)
mw=cv2.warpAffine(m,M,(W,H))
faceS=cv2.warpAffine(C[...,3],M,(W,H)); hairS=cv2.warpAffine(C[...,1]+C[...,5],M,(W,H))
np.save('work/M.npy',M)
cv2.imwrite('work/hw.png',hw); np.save('work/mw.npy',mw); np.save('work/faceS.npy',faceS); np.save('work/hairS.npy',hairS)
print(M, M[0,0]**2+M[0,1]**2)

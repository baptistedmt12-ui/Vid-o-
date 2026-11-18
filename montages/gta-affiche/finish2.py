import cv2, numpy as np
exec(open('swap.py').read().split("out=tgt*(1-mask)")[0].replace("sys.argv[1]) if len(sys.argv)>1 else 10","12)"))
mk=np.zeros((h,w),np.float32); cv2.fillConvexPoly(mk,hull,1)
# fade out more toward the top (forehead) so the hairline stays the target's
ys=np.arange(h,dtype=np.float32)[:,None]; top=T[:,1].min(); brow=T[[105,334,66,296],1].mean()
mk*=np.clip((ys-top)/(brow-top+1e-6)*0.9+0.1,0,1)
mk=cv2.erode(mk,np.ones((31,31))); soft=cv2.GaussianBlur(mk,(0,0),22)[...,None]
out=(tgt*(1-soft)+face*soft).astype(np.uint8)
# light illustration look, whole image
p=cv2.edgePreservingFilter(out,flags=cv2.RECURS_FILTER,sigma_s=12,sigma_r=0.18)
p=cv2.bilateralFilter(p,7,25,7)
bl=cv2.GaussianBlur(p,(0,0),3); p=cv2.addWeighted(p,1.45,bl,-0.45,0)
# warm/purple grade on the new face so it matches the poster palette
hsv=cv2.cvtColor(p,cv2.COLOR_BGR2HSV).astype(np.float32); hsv[...,1]*=1.06
p=cv2.cvtColor(np.clip(hsv,0,255).astype(np.uint8),cv2.COLOR_HSV2BGR)
cv2.imwrite('work/final.png',p); cv2.imwrite('work/final_crop.png',p[0:600,1100:1900])

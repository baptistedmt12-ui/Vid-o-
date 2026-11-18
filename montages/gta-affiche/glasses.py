import cv2,numpy as np
s=cv2.imread('/root/.claude/uploads/795a4e5b-6bad-529c-9439-234a26010442/3f226727-image.png')
o=np.array([450,600])
L=[(128,252),(280,244),(288,300),(270,338),(245,348),(165,350),(135,342)]
R=[(298,246),(478,254),(482,330),(455,350),(375,352),(312,338),(296,300)]
B=[(270,246),(310,246),(305,285),(275,285)]
TL=[(112,262),(132,258),(130,355),(116,352)]; TR=[(472,262),(490,265),(486,360),(472,357)]
polys={'lens':[L,R,B],'arm':[TL,TR]}
np.save('work/glass_polys.npy',np.array([np.array(p)+o for p in L and [L,R,B,TL,TR]],dtype=object),allow_pickle=True)
v=s[600:1400,450:1150].copy()
for p in [L,R,B]: cv2.polylines(v,[np.int32(p)],True,(0,255,0),2)
for p in [TL,TR]: cv2.polylines(v,[np.int32(p)],True,(0,0,255),2)
cv2.imwrite('work/gpoly.jpg',v[150:450,50:550])

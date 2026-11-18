import cv2, numpy as np, mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
U='/root/.claude/uploads/795a4e5b-6bad-529c-9439-234a26010442/'
src=cv2.imread(U+'3f226727-image.png')
seg=vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(base_options=BaseOptions(model_asset_path='seg.tflite'),output_confidence_masks=True))
r=seg.segment(mp.Image(image_format=mp.ImageFormat.SRGB,data=cv2.cvtColor(src,cv2.COLOR_BGR2RGB)))
C=np.stack([m.numpy_view().squeeze() for m in r.confidence_masks],-1)  # bg,hair,body,face,clothes,others
np.save('work/segconf.npy',C.astype(np.float16))
print(C.shape,src.shape,src.dtype)
lab=C.argmax(-1).astype(np.uint8)
pal=np.array([[0,0,0],[0,0,255],[0,255,0],[255,0,0],[255,255,0],[0,255,255]],np.uint8)
v=cv2.addWeighted(src,0.5,pal[lab].reshape(src.shape),0.5,0); cv2.imwrite('work/segview.jpg',cv2.resize(v,None,fx=0.4,fy=0.4))

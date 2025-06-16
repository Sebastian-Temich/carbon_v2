import blurhash
import numpy as np
from PIL import Image

from application import Config
from application.services.image_service import ImageService


class BlurHashService:
    @staticmethod
    def encode_image(image: Image) -> str:
        if image.mode != 'RGB':
            image = image.convert('RGB')

        image = ImageService.resize_to_max_size(image, Config.BLURHASH_IMG_MAX_SIZE)
        image_blurhash = blurhash.encode(
            image=np.asarray(image),
            components_x=Config.BLURHASH_COMPONENTS_X,
            components_y=Config.BLURHASH_COMPONENTS_Y,
            linear=False
        )
        return image_blurhash

    @staticmethod
    def encode_base64_image(base64_image: str) -> str:
        image = ImageService.base64_to_image(base64_image)
        image_blurhash = BlurHashService.encode_image(image)
        return image_blurhash

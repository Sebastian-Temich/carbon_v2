import base64
import io

from PIL import Image


class ImageService:
    @staticmethod
    def resize_to_max_size(image: Image, max_size: int) -> Image:
        width, height = image.size
        if width > height:
            new_width = max_size
            new_height = int((new_width / width) * height)
        else:
            new_height = max_size
            new_width = int((new_height / height) * width)
        return image.resize((new_width, new_height))

    @staticmethod
    def base64_to_image(base64_image: str) -> Image:
        image_as_bytes = base64.b64decode(base64_image)
        return Image.open(io.BytesIO(image_as_bytes))

    @staticmethod
    def get_image_aspect_ratio(image: Image) -> float:
        width, height = image.size
        return width / height

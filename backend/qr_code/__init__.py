from io import BytesIO

import qrcode
import qrcode.image.svg


def generate_qr_code(data: str) -> BytesIO:
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
        image_factory=qrcode.image.svg.SvgPathImage
    )
    qr.add_data(data)
    qr.make(fit=True)

    qr_img = qr.make_image(fill_color="black", back_color="white")
    qr_img_byte_stream = BytesIO()
    qr_img.save(qr_img_byte_stream)
    return qr_img_byte_stream

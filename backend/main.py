from application import create_app
from application.config import Config
from application.controllers import setup_swagger

app = create_app(Config)
setup_swagger(app)

if __name__ == "__main__":
    app.run(port=Config.PORT, debug=Config.DEBUG)

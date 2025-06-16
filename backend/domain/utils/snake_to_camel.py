def snake_to_camel(string: str) -> str:
    if string != '__root__':
        components = string.split('_')
        return components[0] + ''.join(x.title() for x in components[1:])
    else:
        return string

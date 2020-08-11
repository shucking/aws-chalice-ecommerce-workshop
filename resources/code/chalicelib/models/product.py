class Product:
    def __init__(self, product_id, product_name, price, category, img_url):
        self.product_id = product_id
        self.product_name = product_name
        self.price = price
        self.category = category
        self.img_url = img_url

    def get_product_info(self):
        return {
            'PK': self.get_product_id(),
            'SK': self.get_product_name(),
            'price': self.get_price(),
            'category': self.get_category(),
            'img_url': self.get_img_url()}

    def get_product_id(self):
        return self.product_id

    def get_product_name(self):
        return self.product_name

    def get_price(self):
        return self.price

    def get_category(self):
        return self.category

    def get_img_url(self):
        return self.img_url

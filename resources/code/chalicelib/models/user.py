class User:
    def __init__(self, user_id, username, address, shopping_cart, date_created):
        self.user_id = user_id,
        self.username = username,
        self.address = address,
        self.shopping_cart = shopping_cart,
        self.date_created = date_created

    def get_user_info(self):
        return {
            'PK': self.get_user_id(),
            'SK': self.get_user_id,
            'username': self.get_username(),
            'address': self.get_address(),
            'shopping_cart': self.get_shopping_cart(),
            'date_created': self.get_date_created()}

    def get_user_id(self):
        return self.user_id

    def get_username(self):
        return self.username

    def get_address(self):
        return self.address

    def get_shopping_cart(self):
        return self.shopping_cart

    def get_date_created(self):
        return self.date_created

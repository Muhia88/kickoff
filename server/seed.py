from app import create_app, db
from app.models.user import User
from app.models.product import Category, Product
from app.models.event import Event
from app.models.merchandise import Merchandise
from app.models.order import Order, OrderItem, ShippingAddress
from app.models.ticket import Ticket
from datetime import datetime, timedelta

app = create_app()

with app.app_context():
    print("Dropping all tables...")
    db.drop_all()
    print("Creating all tables...")
    db.create_all()

    # Create Users
    print("Creating users...")
    users = [
        User(username='admin', email='admin@kickoff.com', role='admin'),
        User(username='jane', email='jane@kickoff.com', role='user'),
        User(username='john', email='john@kickoff.com', role='user'),
        User(username='alice', email='alice@kickoff.com', role='user'),
        User(username='bob', email='bob@kickoff.com', role='user'),
    ]
    users[0].set_password('adminpassword')
    for user in users[1:]:
        user.set_password('userpassword')
    db.session.add_all(users)

    # Create Categories
    print("Creating categories...")
    cat_whisky = Category(name='Whisky')
    cat_rum = Category(name='Rum')
    cat_beer = Category(name='Beer')
    cat_featured = Category(name='Featured Items')
    db.session.add_all([cat_whisky, cat_rum, cat_beer, cat_featured])
    db.session.commit()

    # Create Products with image URLs
    print("Creating products...")
    products = [
        Product(
            name='Glenfiddich 18 Years',
            price=150.00,
            stock=50,
            category_id=cat_whisky.id,
            image_url='/images/alcohol/whiskey/glenfiddich_18_years.png',
            brand='Glenfiddich',
            product_type='Whisky',
            product_class='single_malt'
        ),
        Product(
            name='Bacardi Black',
            price=25.50,
            stock=100,
            category_id=cat_rum.id,
            image_url='/images/alcohol/rum/bacardi_black_carta_negra.png',
            brand='Bacardi',
            product_type='Rum',
            product_class='dark_rum'
        ),
        Product(
            name='Tusker Lager Can',
            price=2.00,
            stock=200,
            category_id=cat_beer.id,
            image_url='/images/alcohol/beer/tusker_lager.png',
            brand='Tusker',
            product_type='Beer',
            product_class='lager'
        ),
        Product(
            name='Hennessy XO',
            price=220.00,
            stock=30,
            category_id=cat_whisky.id,
            image_url='/images/alcohol/cognac/hennessy_xo.png',
            brand='Hennessy',
            product_type='Cognac',
            product_class='xo'
        ),
        Product(
            name='Don Julio Añejo',
            price=120.00,
            stock=40,
            category_id=cat_rum.id,
            image_url='/images/alcohol/tequila/don_julio_anejo.png',
            brand='Don Julio',
            product_type='Tequila',
            product_class='anejo'
        ),
        Product(
            name='Guinness',
            price=3.00,
            stock=180,
            category_id=cat_beer.id,
            image_url='/images/alcohol/beer/guiness.png',
            brand='Guinness',
            product_type='Beer',
            product_class='stout'
        ),
        # Featured Items
        Product(
            name="Jack Daniel's Barrel Proof Single Barrel Rye Whiskey",
            price=69.99,
            stock=20,
            category_id=cat_featured.id,
            image_url='https://ext.same-assets.com/4095877370/3433335847.jpeg',
            brand="Jack Daniel's",
            product_type='Whisky',
            product_class='single_barrel'
        ),
        Product(
            name="Rare Character Single Barrel Series 8 Year Old Cask Strength Rye Whiskey SEG-007",
            price=119.99,
            stock=10,
            category_id=cat_featured.id,
            image_url='https://ext.same-assets.com/4095877370/331105913.jpeg',
            brand="Rare Character",
            product_type='Whisky',
            product_class='single_barrel'
        ),
        Product(
            name="Russell's Reserve Private Barrel Selection Bourbon Whiskey",
            price=79.99,
            stock=15,
            category_id=cat_featured.id,
            image_url='https://ext.same-assets.com/4095877370/2923094316.jpeg',
            brand="Russell's Reserve",
            product_type='Whisky',
            product_class='bourbon'
        ),
        Product(
            name="Orphan Barrel Fanged Pursuit 17 Year Old Bourbon Whiskey",
            price=199.99,
            stock=5,
            category_id=cat_featured.id,
            image_url='https://ext.same-assets.com/4095877370/2011620315.jpeg',
            brand="Orphan Barrel",
            product_type='Whisky',
            product_class='bourbon'
        ),
        Product(
            name="Johnnie Walker Perfect Moment Blue Label Ice Chalet",
            price=219.99,
            stock=8,
            category_id=cat_featured.id,
            image_url='https://ext.same-assets.com/4095877370/2621073261.jpeg',
            brand="Johnnie Walker",
            product_type='Whisky',
            product_class='blended'
        ),
    ]
    db.session.add_all(products)

    # Create Events
    print("Creating events...")
    e1 = Event(
        name='Whisky Tasting Night',
        description='An exclusive night of tasting rare whiskies.',
        date=datetime.utcnow() + timedelta(days=30),
        location='Nairobi, Kenya',
        ticket_price=50.00,
        tickets_available=100
    )
    e2 = Event(
        name='Brand Launch Party',
        description='Join us for the launch of our new merchandise line.',
        date=datetime.utcnow() + timedelta(days=60),
        location='The Alchemist, Westlands',
        ticket_price=20.00,
        tickets_available=250
    )
    db.session.add_all([e1, e2])

    # Create Merchandise with image URLs
    print("Creating merchandise...")
    merch = [
        Merchandise(name='Kickoff Branded T-Shirt', price=15.00, stock=100, image_url='/images/logo/kickoff_logo.jpeg'),
        Merchandise(name='Kickoff Snapback Cap', price=20.00, stock=75, image_url='/images/logo/kickoff_logo.jpeg'),
        Merchandise(name='Kickoff Hoodie', price=30.00, stock=50, image_url='/images/logo/kickoff_logo.jpeg'),
    ]
    db.session.add_all(merch)

    db.session.commit()
    print("Database seeded successfully!")

    # Create sample orders
    print("Creating sample orders...")
    # Store order (products + merchandise)
    store_order = Order(user_id=users[1].id, total_price=175.50, order_type='mixed', status='pending')
    db.session.add(store_order)
    db.session.commit()

    oi1 = OrderItem(order_id=store_order.id, product_id=products[0].id, quantity=1, price=products[0].price, item_type='product')
    oi2 = OrderItem(order_id=store_order.id, merchandise_id=merch[0].id, quantity=1, price=merch[0].price, item_type='merchandise')
    db.session.add_all([oi1, oi2])
    db.session.commit()

    shipping = ShippingAddress(order_id=store_order.id, recipient_name='Jane Doe', phone='+254700000000', address_line1='123 Nairobi St', city='Nairobi', country='Kenya', pinned_location='-1.2921,36.8219')
    db.session.add(shipping)
    db.session.commit()

    # Event order (tickets)
    event_order = Order(user_id=users[2].id, total_price=e1.ticket_price * 2, order_type='event', status='pending')
    db.session.add(event_order)
    db.session.commit()

    # create two order items for event (quantity 2 could be represented as one order item with quantity 2)
    oi_event = OrderItem(order_id=event_order.id, event_id=e1.id, quantity=2, price=e1.ticket_price, item_type='event')
    db.session.add(oi_event)
    db.session.commit()

    # Create Ticket records linked to the order item
    t1 = Ticket(user_id=users[2].id, event_id=e1.id, order_item_id=oi_event.id, qr_code_url=None)
    t2 = Ticket(user_id=users[2].id, event_id=e1.id, order_item_id=oi_event.id, qr_code_url=None)
    db.session.add_all([t1, t2])
    db.session.commit()

    print("Sample orders created.")

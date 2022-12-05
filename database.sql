
CREATE TABLE IF NOT EXISTS BBY_25_users (
  identity int NOT NULL AUTO_INCREMENT,
  user_name varchar(30),
  first_name varchar(30),
  last_name varchar(30),
  email varchar(30),
  password varchar(30),
  is_admin BOOLEAN,
  profile_pic varchar(60),
  PRIMARY KEY (identity));

CREATE TABLE IF NOT EXISTS BBY_25_users_packages (
  userID int NOT NULL,
  packageID int NOT NULL AUTO_INCREMENT,
  postdate DATETIME,
  purchased BOOLEAN,
  isDelivered BOOLEAN,
  img varchar(100),
  PRIMARY KEY(packageID),
  CONSTRAINT fk_user
  FOREIGN KEY (userID)
    REFERENCES BBY_25_users(identity));

CREATE TABLE IF NOT EXISTS BBY_25_catalogue (
  itemID int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  price decimal(6, 2) NOT NULL,
  most_wanted boolean NOT NULL,
  PRIMARY KEY (itemID));

CREATE TABLE IF NOT EXISTS BBY_25_packages_items (
  packageID int NOT NULL,
  itemID int NOT NULL,
  itemQuantity int NOT NULL,
  PRIMARY KEY(packageID, itemID),
  CONSTRAINT fk_item
  FOREIGN KEY (itemID)
    REFERENCES BBY_25_catalogue(itemID),
  CONSTRAINT fk_package
  FOREIGN KEY (packageID)
    REFERENCES BBY_25_users_packages(packageID));

CREATE TABLE IF NOT EXISTS BBY_25_users_donation (
  donateID int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  postdate DATETIME,
  amount DECIMAL(10,2) NOT NULL,
  PRIMARY KEY(donateID),
  FOREIGN KEY (userID)
    REFERENCES BBY_25_users(identity));

INSERT INTO BBY_25_users (user_name, first_name, last_name, email, password, is_admin, profile_pic) VALUES ("dbui", "Devon", "Bui", "dbui@bcit.ca", "test3", false, "/img/luffy.png");

INSERT INTO BBY_25_users (user_name, first_name, last_name, email, password, is_admin, profile_pic) VALUES ("damah", "David", "Amah", "damah@bcit.ca", "test4", false, "/img/luffy.png");

INSERT INTO BBY_25_users (user_name, first_name, last_name, email, password, is_admin, profile_pic) VALUES ("pdychinco", "Princeton", "Dychinco", "pdychinco@bcit.ca", "test1", true, "/img/luffy.png");

INSERT INTO BBY_25_users (user_name, first_name, last_name, email, password, is_admin, profile_pic) VALUES ("idatayan", "Izabelle", "Datayan", "idatayan@bcit.ca", "test2", true, "/img/luffy.png");

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Toothbrush", 1.99, true);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Boots", 19.99, true);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Sleeping Bag", 24.99, true);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Baby Food", 9.99, true);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Non-Perishable Food", 29.99, true);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("First-aid Kit", 14.99, false);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Books", 4.99, false);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Socks", 2.99, false);

INSERT INTO BBY_25_catalogue (name, price, most_wanted) VALUES ("Cell Phone", 199.99, false);


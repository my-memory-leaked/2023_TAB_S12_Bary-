-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-05-12 23:05:05.982

-- tables
-- Table: Addresses
CREATE TABLE Addresses (
    id int  NOT NULL IDENTITY(1, 1),
    city nvarchar(max)  NOT NULL,
    street nvarchar(max)  NOT NULL,
    postal_code nvarchar(max)  NOT NULL,
    number int  NOT NULL,
    county_id int  NOT NULL,
    CONSTRAINT Addresses_pk PRIMARY KEY  (id)
);

-- Table: Administrators
CREATE TABLE Administrators (
    id int  NOT NULL IDENTITY(1, 1),
    user_id int  NOT NULL,
    CONSTRAINT Administrators_pk PRIMARY KEY  (id)
);

-- Table: Belongs
CREATE TABLE Belongs (
    product_instance_id int  NOT NULL,
    category_id int  NOT NULL,
    CONSTRAINT Belongs_pk PRIMARY KEY  (product_instance_id,category_id)
);

-- Table: Categories
CREATE TABLE Categories (
    id int  NOT NULL IDENTITY(1, 1),
    parent_id int  NULL,
    name nvarchar(max)  NOT NULL,
    CONSTRAINT Categories_pk PRIMARY KEY  (id)
);

-- Table: Comments
CREATE TABLE Comments (
    id int  NOT NULL IDENTITY(1, 1),
    user_id int  NOT NULL,
    offer_id int  NOT NULL,
    content nvarchar(max)  NOT NULL,
    dislikers int  NOT NULL,
    likers int  NOT NULL,
    creation_time datetime2(7)  NOT NULL,
    admin_id int ,
    CONSTRAINT Comments_pk PRIMARY KEY  (id)
);

-- Table: Counties
CREATE TABLE Counties (
    id int  NOT NULL IDENTITY(1, 1),
    name nvarchar(max)  NOT NULL,
    CONSTRAINT Counties_pk PRIMARY KEY  (id)
);

-- Table: Dislikers
CREATE TABLE Dislikers (
    user_id int  NOT NULL,
    comment_id int  NOT NULL,
    CONSTRAINT Dislikers_pk PRIMARY KEY  (user_id,comment_id)
);

-- Table: Favourites
CREATE TABLE Favourites (
    user_id int  NOT NULL,
    offer_id int  NOT NULL,
    CONSTRAINT Favourites_pk PRIMARY KEY  (user_id,offer_id)
);

-- Table: Likers
CREATE TABLE Likers (
    user_id int  NOT NULL,
    comment_id int  NOT NULL,
    CONSTRAINT Likers_pk PRIMARY KEY  (user_id,comment_id)
);

-- Table: Offers
CREATE TABLE Offers (
    id int  NOT NULL IDENTITY,
    price decimal(18,2)  NOT NULL,
    product_id int  NOT NULL,
    sales_point_id int  NOT NULL,
    creation_time datetime2(7)  NOT NULL,
    admin_id int,
    user_id int  NOT NULL,
    CONSTRAINT Offers_pk PRIMARY KEY  (id)
);

-- Table: ProductInstances
CREATE TABLE ProductInstances (
    id int  NOT NULL IDENTITY(1, 1),
    product_id int  NOT NULL,
    additional_info nvarchar(max)  NOT NULL,
    image_name nvarchar(max)  NOT NULL,
    CONSTRAINT ProductInstances_pk PRIMARY KEY  (id)
);

-- Table: Products
CREATE TABLE Products (
    id int  NOT NULL IDENTITY(1, 1),
    name nvarchar(max)  NOT NULL,
    available_props nvarchar(max)  NOT NULL,
    CONSTRAINT Products_pk PRIMARY KEY  (id)
);

-- Table: SalesPoints
CREATE TABLE SalesPoints (
    id int  NOT NULL IDENTITY(1, 1),
    name nvarchar(max)  NOT NULL,
    address_id int  NOT NULL,
    CONSTRAINT SalesPoints_pk PRIMARY KEY  (id)
);

-- Table: Users
CREATE TABLE Users (
    id int  NOT NULL IDENTITY(1, 1),
    name nvarchar(max)  NOT NULL,
    email nvarchar(max)  NOT NULL,
    password_hash varbinary(max)  NOT NULL,
    password_salt varbinary(max)  NOT NULL,
    can_comment bit  NOT NULL,
    CONSTRAINT id PRIMARY KEY  (id)
);

-- foreign keys
-- Reference: Adds_offer (table: Offers)
ALTER TABLE Offers ADD CONSTRAINT Adds_offer
    FOREIGN KEY (user_id)
    REFERENCES Users (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Administrators_Users (table: Administrators)
ALTER TABLE Administrators ADD CONSTRAINT Administrators_Users
    FOREIGN KEY (user_id)
    REFERENCES Users (id);

-- Reference: Belongs_to (table: Belongs)
ALTER TABLE Belongs ADD CONSTRAINT Belongs_to
    FOREIGN KEY (product_instance_id)
    REFERENCES ProductInstances (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Comments_Administrators (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comments_Administrators
    FOREIGN KEY (admin_id)
    REFERENCES Administrators (id);

-- Reference: Comments_Users (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comments_Users
    FOREIGN KEY (user_id)
    REFERENCES Users (id);

-- Reference: Concerns (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Concerns
    FOREIGN KEY (offer_id)
    REFERENCES Offers (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Disliked_by (table: Dislikers)
ALTER TABLE Dislikers ADD CONSTRAINT Disliked_by
    FOREIGN KEY (comment_id)
    REFERENCES Comments (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Dislikes (table: Dislikers)
ALTER TABLE Dislikers ADD CONSTRAINT Dislikes
    FOREIGN KEY (user_id)
    REFERENCES Users (id);

-- Reference: Favourites_Offers (table: Favourites)
ALTER TABLE Favourites ADD CONSTRAINT Favourites_Offers
    FOREIGN KEY (offer_id)
    REFERENCES Offers (id);

-- Reference: Has_favourite (table: Favourites)
ALTER TABLE Favourites ADD CONSTRAINT Has_favourite
    FOREIGN KEY (user_id)
    REFERENCES Users (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Has_instance (table: ProductInstances)
ALTER TABLE ProductInstances ADD CONSTRAINT Has_instance
    FOREIGN KEY (product_id)
    REFERENCES Products (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Has_product (table: Offers)
ALTER TABLE Offers ADD CONSTRAINT Has_product
    FOREIGN KEY (product_id)
    REFERENCES ProductInstances (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Has_products (table: Belongs)
ALTER TABLE Belongs ADD CONSTRAINT Has_products
    FOREIGN KEY (category_id)
    REFERENCES Categories (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: In_in (table: Addresses)
ALTER TABLE Addresses ADD CONSTRAINT In_in
    FOREIGN KEY (county_id)
    REFERENCES Counties (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Liked_By (table: Likers)
ALTER TABLE Likers ADD CONSTRAINT Liked_By
    FOREIGN KEY (comment_id)
    REFERENCES Comments (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Likes (table: Likers)
ALTER TABLE Likers ADD CONSTRAINT Likes
    FOREIGN KEY (user_id)
    REFERENCES Users (id);

-- Reference: Provides (table: Offers)
ALTER TABLE Offers ADD CONSTRAINT Provides
    FOREIGN KEY (sales_point_id)
    REFERENCES SalesPoints (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: SalesPoints_Addresses (table: SalesPoints)
ALTER TABLE SalesPoints ADD CONSTRAINT SalesPoints_Addresses
    FOREIGN KEY (address_id)
    REFERENCES Addresses (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

-- Reference: Subcategory (table: Categories)
ALTER TABLE Categories ADD CONSTRAINT Subcategory
    FOREIGN KEY (parent_id)
    REFERENCES Categories (id);

-- Reference: ban (table: Offers)
ALTER TABLE Offers ADD CONSTRAINT ban
    FOREIGN KEY (admin_id)
    REFERENCES Administrators (id);

-- End of file.


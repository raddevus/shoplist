CREATE TABLE [ShopList]
(   [ID] INTEGER NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(250) NOT NULL check(length(Title) <= 250),
    [Created] NVARCHAR(30) default (datetime('now','localtime')) check(length(Created) <= 30),
    UNIQUE(Title)
)

CREATE TABLE [ListItem]
(   [ID] INTEGER NOT NULL PRIMARY KEY,
    [ShopListId] INTEGER NOT NULL,
    [Description] NVARCHAR(500) NOT NULL check(length(Description) <= 500),
    [Created] NVARCHAR(30) default (datetime('now','localtime')) check(length(Created) <= 30),
    [Completed] BOOLEAN default(0) check(Completed IN (0, 1))
)
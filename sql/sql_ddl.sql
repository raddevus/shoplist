CREATE TABLE [ShopList]
(   [ID] INTEGER NOT NULL PRIMARY KEY,
    [OwnerId] INTEGER NOT NULL,
    [Title] NVARCHAR(250) NOT NULL check(length(Title) <= 250),
    [Created] NVARCHAR(30) default (datetime('now','localtime')) check(length(Created) <= 30)
)

CREATE TABLE [Item]
(   [ID] INTEGER NOT NULL PRIMARY KEY,
    [ShopListId] INTEGER NOT NULL,
    [Description] NVARCHAR(500) NOT NULL check(length(Title) <= 500),
    [Created] NVARCHAR(30) default (datetime('now','localtime')) check(length(Created) <= 30),
    [Completed] BOOLEAN default(0) check(Completed IN (0, 1))
)
    
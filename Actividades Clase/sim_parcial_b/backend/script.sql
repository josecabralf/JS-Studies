CREATE table clientes( 
              IdCliente INTEGER PRIMARY KEY AUTOINCREMENT
            , ApellidoYNombre TEXT NOT NULL UNIQUE
            , DNI INTEGER NOT NULL
            );

insert into clientes values
      (1,'LOPEZ MARIA',29895741),
      (2,'LOPEZ IVAN',34874147),
      (3,'FERNANDEZ JULIAN',17266559),
      (4,'ZABALA INES',47987789),
      (4,'ALVAREZ MARTIN',22792877)
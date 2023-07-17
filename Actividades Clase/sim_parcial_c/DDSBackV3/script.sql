CREATE table deudores( 
              IdDeudor INTEGER PRIMARY KEY AUTOINCREMENT
            , DeudorDescripcion TEXT NOT NULL UNIQUE
            , MontoAdeudado INTEGER NOT NULL
            );

insert into deudores (DeudorDescripcion, MontoAdeudado) values
('Juan Pérez', 5320),
('María Gómez', 97853),
('Carlos López', 654987),
('Ana Ramírez', 62378),
('Luis González', 5486),
('Laura Martínez', 75321),
('Pedro Rodríguez', 42356),
('Isabel Torres', 63241),
('Andrés Sánchez', 5876),
('Sofía Herrera', 74592),
('Javier Castro', 8745),
('Fernanda Vargas', 36257),
('Roberto Mendoza', 5482),
('Carolina Silva', 94275),
('Daniel Aguilar', 45732),
('Valeria Cordero', 87945),
('Hugo Velázquez', 6253),
('Natalia Ríos', 63217),
('Eduardo Paredes', 24578),
('Gabriela Cáceres', 75124),
('Manuel Ocampo', 36487),
('Verónica Salgado', 5421),
('Miguel Torres', 98275),
('Alejandra Ponce', 54236),
('Ricardo Ibarra', 63214),
('Paula Mora', 4562),
('Francisco Alvarado', 78543),
('Marcela Ramos', 65421),
('Andrea Gutiérrez', 9856),
('Gustavo Medina', 12357),
('Camila Montenegro', 74256),
('Martín Escobar', 98527),
('Patricia Quiroz', 6523),
('Héctor Morales', 36478),
('Gabriela Benavides', 98741),
('Mario Carrillo', 12358),
('Alejandra Zamora', 54726),
('Rodrigo Navarro', 3652),
('Adriana Solís', 74895),
('Diego Parra', 32578),
('Lorena Calle', 97841),
('Jorge Espinosa', 35627),
('Paulina Godoy', 74892),
('Sebastián Mendoza', 63258),
('Valentina Cáceres', 3652),
('Luisa González', 98743),
('Raúl Torres', 32578),
('Carla Castro', 98756),
('Juan Manuel Silva', 87412),
('Elena Ramírez', 54239)
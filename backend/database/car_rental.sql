CREATE TABLE IF NOT EXISTS mark
(
	id_mark SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS model
(
	id_model SERIAL NOT NULL PRIMARY KEY,
	id_mark SERIAL NOT NULL,
	name VARCHAR(100) NOT NULL UNIQUE,
	CONSTRAINT model_mark_id_mark_fk
		FOREIGN KEY(id_mark) 
			REFERENCES mark(id_mark)
				ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS car
(
	id_car SERIAL NOT NULL PRIMARY KEY,
	id_mark SERIAL NOT NULL,
	id_model SERIAL NOT NULL,
	transmission SMALLINT NOT NULL,
	year SMALLINT NOT NULL,
	fuel SMALLINT NOT NULL,
	body SMALLINT NOT NULL,
	CONSTRAINT car_mark_id_mark_fk
		FOREIGN KEY(id_mark) 
			REFERENCES mark(id_mark),
	CONSTRAINT car_model_id_model_fk
		FOREIGN KEY(id_model) 
			REFERENCES model(id_model)		
);

CREATE TABLE IF NOT EXISTS city
(
	id_city SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS "user"
(
	id_user SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	phone VARCHAR(20) NOT NULL UNIQUE,
	email VARCHAR(30) NOT NULL UNIQUE,
	id_city SERIAL NOT NULL,
	password VARCHAR(145) NOT NULL,
	CONSTRAINT user_city_id_city_fk
		FOREIGN KEY(id_city) 
			REFERENCES city(id_city)	
 );

CREATE TABLE IF NOT EXISTS review
(
	id_review SERIAL NOT NULL PRIMARY KEY,
	id_user SERIAL NOT NULL,
	rating SMALLINT NOT NULL,
	CONSTRAINT review_user_id_user_fk
		FOREIGN KEY(id_user) 
			REFERENCES "user"(id_user)
);

CREATE TABLE IF NOT EXISTS advertisment
(
	id_advertisment SERIAL NOT NULL PRIMARY KEY,
	id_car SERIAL NOT NULL,
	id_user SERIAL NOT NULL,
	id_city SERIAL NOT NULL,
	cost MONEY NOT NULL,
	description VARCHAR NOT NULL,
	is_open SMALLINT NOT NULL,
	photo_path VARCHAR(50) NOT NULL,
	CONSTRAINT advertisment_car_id_car_fk
		FOREIGN KEY(id_car) 
			REFERENCES car(id_car)
				ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT advertisment_user_id_user_fk
		FOREIGN KEY(id_user) 
			REFERENCES "user"(id_user),
	CONSTRAINT advertisment_city_id_city_fk
		FOREIGN KEY(id_city) 
			REFERENCES city(id_city)
);

drop table advertisment cascade

CREATE TABLE IF NOT EXISTS booking
(
	id_booking SERIAL NOT NULL PRIMARY KEY,
	id_advertisment SERIAL NOT NULL,
	id_renter SERIAL NOT NULL,
	state SMALLINT NOT NULL,
	/*     
	*/
	"start" DATE NOT NULL,
	"end" DATE NOT NULL,
	CONSTRAINT booking_advertisment_id_advertisment_fk
		FOREIGN KEY(id_advertisment) 
			REFERENCES advertisment(id_advertisment),
	CONSTRAINT booking_user_id_user_fk
		FOREIGN KEY(id_renter) 
			REFERENCES "user"(id_user)
);

CREATE TABLE IF NOT EXISTS lessors_review
(
	id_lessors_review SERIAL NOT NULL,
	id_renter SERIAL NOT NULL,
	description VARCHAR NOT NULL,
	CONSTRAINT lessors_review_user_id_user_fk
		FOREIGN KEY(id_renter) 
			REFERENCES "user"(id_user)
);

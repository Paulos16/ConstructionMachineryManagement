
--###########################################################################
--# SQL SERVER script creating a database									#
--# for ConstructionMachineryManagement system								#
--# Script author:															#
--# https://github.com/Paulos16												#
--# Repo:																	#
--# https://github.com/Paulos16/ConstructionMachineryManagement				#
--###########################################################################

-- CREATE DATABASE
use master;
go

create database CMM
on
(
	name = cmm_dat,
    filename = '/var/opt/mssql/data/cmmdat.mdf',
    size = 8MB,
    maxsize = 128MB,
    filegrowth = 8MB
)
log on
(
	name = cmm_log,
    filename = '/var/opt/mssql/data/cmmlog.ldf',
    size = 4MB,
    maxsize = 64MB,
    filegrowth = 4MB
);
go

-- CREATE LOGIN
create login cmmTest
	with password = N'33ConstructionMan33'
	must_change, default_database = CMM, check_expiration = on, check_policy=on;
go

-- CREATE USER
use CMM;
go

create user cmmTest for login cmmTest with default_schema=dbo;
go


-- CREATE TABLES

--Wniosek
--IdWniosek:number
--Tresc:string
--RejestracjaMaszyny:string
--CzyPoprawny:boolean
--IdRodzajMaszyny:number
--IdZlecenieDefinicji:number
--Status:string

--RodzajMaszyny
--IdRodzajMaszyny:number
--Nazwa:string

--Maszyna
--IdMaszyna:number
--Rejestracja:string
--CzyZdatna:boolean
--TerminWaznosciPrzegladu:string
--IdRodzajMaszyny: number
--IdWniosek:number

--Definicja
--IdDefinicja:number
--DokumentDefinicji:string
--IdRodzajMaszyny:number

--ZlecenieDefinicji
--IdZlecenieDefinicji:number
--Data:string
--IdRodzajMaszyny:number

--Przeglad
--IdPrzeglad:number
--DokumentPrzegladu:string
--CzyZrobiony:boolean
--IdMaszyna:number
--IdWniosek:number

--ZleceniePrzegladu
--IdZleceniePrzegladu:number
--Data:string
--IdMaszyna:number
--Dokument:string

--User
--id:number
--username:string
--password:string
--role:string

--roles:
--inspector
--office
--applicant


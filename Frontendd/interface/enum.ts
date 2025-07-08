import { Role } from "../enum/roles.enum";

export type PropertyType = 'appartment' | 'house' | 'land' | 'commercial' | 'garage' | 'office' | 'farmhouse';


export type PropertyStatus = 'available' | 'sold';


export type TransactionType = 'rent' | 'sell';


export type UserRole = Role.User | Role.Admin;
"use server";

import crypto from "crypto";
import nodemailer from "nodemailer";
import { prisma } from "../lib/database";
import { Role } from "../type";
import argon2 from "argon2"

export const createUser = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return {
            success: false,
            message: "User already exists",
        };
    }

    const password = crypto.randomBytes(8).toString("hex");

    const hashPass = await argon2.hash(password);

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashPass,
            role: Role.USER,
        },
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Account Credentials",
        html: `
            <h2>Welcome ${name}</h2>

            <p>Your account has been created by an administrator.</p>

            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>

            <p>Please change your password after your first login.</p>
        `,
    });

    return {
        success: true,
        message: "User created successfully",
    };
};
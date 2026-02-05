import User from "../models/User.js";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ username: "admin" });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("admin", 10);

            const admin = new User({
                username: "admin",
                email: "Sohebhashmiwork@gmail.com",
                password: hashedPassword,
                role: "admin",
            });

            await admin.save();
            console.log("Default admin created successfully");
            console.log("Username: admin");
            console.log("Password: admin");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
};

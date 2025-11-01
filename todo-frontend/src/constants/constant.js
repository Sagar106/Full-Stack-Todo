export const validators = {
    username: [
        {
            test: (v) => v.trim() !== "",
            message: "Username is required"
        }
    ],
    email: [
        {
            test: (v) => v.trim() !== "",
            message: "Email is required"
        },
        {
            test: (v) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v),
            message: "Invalid email address"
        }
    ],
    password: [
        {
            test: (v) => v !== "",
            message: "Password is required"
        },
        {
            test: (v) => v.length >= 8,
            message: "Password must be atleast 8 characters"
        },
        {
            test: (v) => /[A-Z]/.test(v),
            message: "Password must contain an uppercase letter"
        },
        {
            test: (v) => /[a-z]/.test(v),
            message: "Password must contain atleast one lowercase letter"
        },
        {
            test: (v) => /[0-9]/.test(v),
            message: "Password must contain atleast one number"
        },
        {
            test: (v) => /[!@^#$&%*]/.test(v),
            message: "Password must contain atleast one special character"
        }
    ]
}
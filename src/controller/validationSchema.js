const Joi = require("joi");

const schema = {
  userSchema: Joi.object({
    user_email: Joi.string().email().required().messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    user_name: Joi.string().min(3).max(50).required().messages({
      "string.empty": "Username cannot be empty",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must be less than 50 characters",
      "any.required": "Username is required",
    }),
    user_phone: Joi.string()
      .min(8)
      .max(14)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must contain only digits",
        "string.min": "Phone number must be at least 8 digits",
        "string.max": "Phone number cannot exceed 14 digits",
        "any.required": "Phone number is required",
      }),
    user_password: Joi.string().min(4).max(15).required().messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 4 characters long",
      "string.max": "Password cannot exceed 15 characters",
      "any.required": "Password is required",
    }),
    confirm_password: Joi.string()
      .valid(Joi.ref("user_password"))
      .required()
      .messages({
        "any.only": "Confirm password must match the password",
        "any.required": "Confirm password is required",
      }),
    user_photo: Joi.string().uri().allow("").optional().messages({
      "string.uri": "Invalid URL format for photo",
    }),
  }),

  passwordSchema: Joi.object({
    user_password: Joi.string().min(4).max(15).required().messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 4 characters long",
      "string.max": "Password cannot exceed 15 characters",
      "any.required": "Password is required",
    }),
    confirm_password: Joi.string()
      .valid(Joi.ref("user_password"))
      .required()
      .messages({
        "any.only": "Confirm password must match the password",
        "any.required": "Confirm password is required",
      }),
  }),

  recipeSchema: Joi.object({
    recipe_title: Joi.string().min(3).max(255).required().messages({
      "string.min": "Recipe title must be at least 3 characters long",
      "string.max": "Recipe title cannot exceed 255 characters",
      "any.required": "Recipe title is required",
    }),
    recipe_ingredients: Joi.string().min(3).required().messages({
      "string.min": "Ingredients must be at least 3 characters long",
      "any.required": "Ingredients are required",
    }),
    user_id: Joi.string().uuid().required().messages({
      "string.uuid": "User ID must be a valid UUID",
      "any.required": "User ID is required",
    }),
    recipe_video: Joi.string().uri().required().messages({
      "string.uri": "Recipe video URL must be valid",
      "any.required": "Recipe video URL is required",
    }),
    category_id: Joi.string().uuid().required().messages({
      "string.uuid": "Category ID must be a valid UUID",
      "any.required": "Category ID is required",
    }),
  }),

  commentSchema: Joi.object({
    recipe_id: Joi.string().uuid().required().messages({
      "string.uuid": "Recipe ID must be a valid UUID",
      "any.required": "Recipe ID is required",
    }),
    user_id: Joi.string().uuid().required().messages({
      "string.uuid": "User ID must be a valid UUID",
      "any.required": "User ID is required",
    }),
    comment_text: Joi.string().min(1).max(500).required().messages({
      "string.min": "Comment text must be at least 1 character",
      "string.max": "Comment text cannot exceed 500 characters",
      "any.required": "Comment text is required",
    }),
  }),

  updateCommentSchema: Joi.object({
    comment_text: Joi.string().min(1).max(500).required().messages({
      "string.min": "Comment text must be at least 1 character",
      "string.max": "Comment text cannot exceed 500 characters",
      "any.required": "Comment text is required",
    }),
  }),

  categorySchema: Joi.object({
    category_name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Category name must be a string.",
      "string.min": "Category name must be at least 3 characters long.",
      "string.max": "Category name cannot be longer than 100 characters.",
      "any.required": "Category name is required.",
    }),
  }),
};

module.exports = schema;

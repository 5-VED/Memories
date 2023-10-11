const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  "openapi": "3.0.0",
  "info": {
    "title": "Sign Up API",
    "description": "API for user registration",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:3000",
      "description": "Development server"
    }
  ],
  "paths": {
    "/api/v1/signup": {
      "post": {
        "summary": "Register a new user",
        "description": "Register a new user with name, email, password, and confirm_password.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "User's name"
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "User's email address"
                  },
                  "password": {
                    "type": "string",
                    "format": "password",
                    "description": "User's password"
                  },
                  "confirm_password": {
                    "type": "string",
                    "format": "password",
                    "description": "Confirm password"
                  }
                },
                "required": ["name", "email", "password", "confirm_password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User successfully registered",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Registration success message"
                    },
                    "data": {
                      "type": "object",
                      "description": "Registered user data"
                      // You can add more properties to describe the user data structure here
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request. Invalid input data",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Error message describing the bad request"
                    },
                    "error": {
                      "type": "object",
                      "description": "Error details"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Error message describing the internal server error"
                    },
                    "error": {
                      "type": "object",
                      "description": "Error details"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/signin": {
      "post": {
        "summary": "Sign in user",
        "description": "Sign in a user with email and password.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "User's email address."
                  },
                  "password": {
                    "type": "string",
                    "description": "User's password."
                  }
                },
                "required": ["email", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Signed in successfully.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Sign-in success message."
                    },
                    "data": {
                      "type": "object",
                      "description": "Sign-in data.",
                      "properties": {
                        "name": {
                          "type": "string",
                          "description": "User's name."
                        },
                        "email": {
                          "type": "string",
                          "format": "email",
                          "description": "User's email address."
                        },
                        "deleted": {
                          "type": "boolean",
                          "description": "Indicates if the user is deleted or not."
                        },
                        "token": {
                          "type": "string",
                          "description": "JSON Web Token (JWT) for authentication."
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request. Invalid credentials.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Error message describing the bad request."
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "User does not exist.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Error message indicating that the user does not exist."
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Error message describing the internal server error."
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    "/api/v1/newPost": {
      "consumes": ["multipart/form-data"],
    },
    "/signup": {
      "post": {
        "tags": ["Users"],
        "summary": "Api Endpoint to Signup User",
        "description": "Create New User",
        "consumes": ["multipart/form-data"],
        "parameters": [
          {
            "name": "name",
            "in": "formData",
            "description": "Name of the User",
            "required": true,
            "type": "string"
          },
          {
            "name": "file",
            "in": "formData",
            "description": "Image of the User",
            "required": true,
            "type": "file"
          },
          {
            "name": "email",
            "in": "formData",
            "description": "Email of the User",
            "required": true,
            "type": "string"
          },
          {
            "name": "password",
            "in": "formData",
            "description": "Passwod of the User",
            "required": true,
            "type": "string"
          }
        ],
        "produces": ["application/json"],
        "responses": {
          "200": {
            "description": "New User Regiatered"
          }
        }
      }
    },
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "confirm_password": {
            "type": "string"
          },
          "isDeleted": {
            "type": "boolean"
          }
        }
      },
      "Memory": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "create": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "avatar": {
            "type": "file"
          },
          "gallery": {
            "type": "file",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          }
        }
      }
    }
  },


}


const options = {
  swaggerDefinition,
  apis: ['./Controller/*.js'], // Replace with the path to your controller files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec
import joi from 'joi'

export const registerUserSchema = joi.object({
    name: joi.string().required(),
        email : joi.string().email().required(),
        password: joi.string().required(),
        confirm_password: joi.string().required(),

})

export const userLoginValidationSchema = joi.object({
        email:joi.string().email({
            minDomainSegments:2,tlds : {
                allow :['ke','com']
    
            }
        }),
        password:joi.string().required()
    
    });
    
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async register ({ request,response }: HttpContextContract) {
    /**
     * Validate user details
     */
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      phone : schema.string({trim : true},[
        rules.minLength(6),
        rules.maxLength(15)
      ]),
      name : schema.string({trim : true},[
        
      ]),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
      ]),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
    })



    /**
     * Create a new user
     */
    const user = new User()
    user.email = userDetails.email
    user.password = userDetails.password
    user.name = userDetails.name
    user.phone = userDetails.phone
    
    await user.save()

    return response.redirect('/login')
  }

  public async login ({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password') 
    await auth.attempt(email, password)

    response.redirect('/dashboard')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    
    await auth.logout()
    return response.redirect('/login')
  }

  public async profile ({ view }: HttpContextContract) {
     
    return view.render('pages/profile')
  }

  public async changePassword ({ request,auth, response,session }: HttpContextContract) {
     
    var user = await auth.authenticate();
    
    user.name = request.input('name');
    user.email = request.input('email');
    user.phone = request.input('phone');
    if(request.input('password'))
    {
      user.password = request.input('password')
    }
    await user.save();
    session.flash('success', 'Profile telah disimpan')
    return response.redirect('/profile')
  }

}
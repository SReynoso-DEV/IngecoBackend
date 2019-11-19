import * as jwt from 'jsonwebtoken';
import { dirname } from 'path';
import { EvalSourceMapDevToolPlugin } from 'webpack';

export class AuthHelper {

/*******************************************************
 * Return a Jwt Token
    id: number;

    username: string;

    password: string;

    dni: number;

    ruc: bigint;

    nombre: string;

    apellido: string;

    telefono: number;

    domicilio: string
 *******************************************************/
    genToken(empleado) {
		console.log("empleado",empleado)
		let tok = jwt.sign(
		{
			id: empleado.id,
            username: empleado.username,
            email: empleado.email,
            dni: empleado.dni,
            ruc: empleado.ruc,
            nombre: empleado.nombre,
            apellido: empleado.apellido,
            telefono: empleado.telefono,
            domicilio: empleado.domicilio,
			exp: Math.round(new Date().getTime() / 1000) + 604800 // 1 week
		}
		,'mysecret')
		const token = {
		  token: tok
		}

		jwt.verify(tok, 'mysecret', function(err, payload) {
			if (!err) {
			  //confirm identity and check user permissions
			  console.log("payload",payload)
			} else {
			  console.log("Err token")
			}
		  });

      return token;
  }
}
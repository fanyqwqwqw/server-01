
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
//import { usuariosConectados } from '../sockets/socket';

const router = Router(); //para crear los api endpoints



router.get('/mensajes', ( req: Request, res: Response  ) => { //path que se quiere llamar, (handler - f() que va a manejar esta peticion)
    //mandamos un mensaje de respuesta
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

//Servico para leer el URL
router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;
    
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});

/*
// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (  req: Request, res: Response ) => {

    const server = Server.instance;

    //server.io.clients( ( err: any, clientes: string[] ) => {

        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            clientes
        });


    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

    
});

*/


export default router;



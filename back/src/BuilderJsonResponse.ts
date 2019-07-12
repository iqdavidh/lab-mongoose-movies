import {Response} from "express";

const BuilderJsonresponse = {
   Success: (res: Response, dataResponse: any): void => {

      let data: any = {
         success: true,
         msg: '',
         data: dataResponse
      };

      res.status(200).json(data);
   },
   Error: (res: Response, error: any, code: number = 500): void => {
      let data: any = {
         success: false,
         msg: error
      };
      res.status(code).json(data);
   }
};

export default BuilderJsonresponse;

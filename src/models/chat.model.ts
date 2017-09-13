export class Chat{
    public $key:string;
    constructor(
        public lastMessage:String,
        public timestamp:any,
        public title:string,
        public photo:string,
    ){}
}
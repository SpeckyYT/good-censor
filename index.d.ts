type censorOptions = {
    censorText:string
    censorLoop:boolean
    censorLongest:boolean
    censorSlice:boolean
    censorStart:number
    censorEnd:number
    ignore:RegExp
}
export = class GoodCensor {
    constructor(words:Array<string>|string,defaultOptions:Partial<censorOptions>)
    badwords:Array<string>
    censor(text:string,options:censorOptions):string
    check(text:string,options:censorOptions):boolean
}

type censorOptions = {
    censorText:String
    censorLoop:Boolean
    censorLongest:Boolean
    censorSlice:Boolean
    censorStart:Number
    censorEnd:Number
}
export const badwords:Array<String>
export function censor(text:String,options:censorOptions):String

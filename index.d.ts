type censureOptions = {
    censorText:String
    censorLoop:Boolean
    censorLongest:Boolean
    censorSlice:Boolean
    censorStart:Number
    censorEnd:Number
}
export const badwords:Array<String>
export function censure(text:String,options:censureOptions):String

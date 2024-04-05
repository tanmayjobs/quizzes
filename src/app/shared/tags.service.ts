import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "./constants";
import { catchError } from "rxjs";
import { handleError } from "./app.helpers";

export interface Tag{
    tag_id: string;
    tag_name: string;
}

@Injectable({providedIn: 'root'})
export class TagsService{
    constructor(private httpClient: HttpClient){}

    getAllTags(){
        return this.httpClient.get(`${Constants.BASEURL}/tags`).pipe(catchError(handleError))
    }
}
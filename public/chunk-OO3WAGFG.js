import{a as n}from"./chunk-UMWSO6KU.js";import{K as s,Q as o}from"./chunk-WRNNQS3D.js";import{h as i}from"./chunk-FK42CRUA.js";var u=class r{_supabaseClient=o(n).supabaseClient;saveResult(e,t,a){return i(this,null,function*(){let{error:c}=yield this._supabaseClient.from("puntaje").insert({usuario_id:e,game:t,puntaje:a});return c})}getTopResults(e=5){return i(this,null,function*(){let{data:t,error:a}=yield this._supabaseClient.from("resultados").select(`usuarios (
      nombre
    ), dificultad, tiempo`).order("tiempo",{ascending:!0}).limit(e);return{data:t||[],error:a}})}getTopResultsFacil(e=5){return i(this,null,function*(){let{data:t,error:a}=yield this._supabaseClient.from("resultados").select(`usuarios (
      nombre
    ), dificultad, tiempo`).eq("dificultad","facil").order("tiempo",{ascending:!0}).limit(e);return{data:t||[],error:a}})}getTopResultsDificil(e=5){return i(this,null,function*(){let{data:t,error:a}=yield this._supabaseClient.from("resultados").select(`usuarios (
      nombre
    ), dificultad, tiempo`).eq("dificultad","dificil").order("tiempo",{ascending:!0}).limit(e);return{data:t||[],error:a}})}getTopResultsMedio(e=5){return i(this,null,function*(){let{data:t,error:a}=yield this._supabaseClient.from("resultados").select(`usuarios (
      nombre
    ), dificultad, tiempo`).eq("dificultad","medio").order("tiempo",{ascending:!0}).limit(e);return{data:t||[],error:a}})}static \u0275fac=function(t){return new(t||r)};static \u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"})};export{u as a};

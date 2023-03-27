const posts = [
    {
        photo:"https://all.accor.com/magazine/imagerie/ferias-na-praia-o-que-fazer-das-f163.jpg",
        description:"Curtindo aquela praiazinha e apreciando um abacaxi estiloso",
        timesTamp: 1674864356,
        autor: {
            name: "Josue Gomes",
            username:"josuegg",
            photo: "http://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg"
        }
    },
    {
        photo:"https://cdn0.casamentos.com.br/vendor/7598/3_2/960/jpg/tembui-mesa-2-1_13_67598.jpeg",
        description:"Um bom vinho e uma boa comida.",
        timesTamp: 1674842059,
        autor: {
            name: "Raul Castanhari",
            username:"raulcast",
            photo: "https://cajamar.sp.gov.br/noticias/wp-content/uploads/sites/2/2021/08/site-vacinacao-26-anos.png"
        }
    },
    {
        photo:"https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2021/12/saiba-como-planejar-uma-viagem-nacional.png",
        description:"Colecionando momentos!",
        timesTamp: 1674440554,
        autor: {
            name: "Patricia Oliveira",
            username:"pat_oliver",
            photo: "https://www.psicologo.com.br/wp-content/uploads/10-caracteristicas-de-pessoas-carismaticas-1024x768.jpg"
        }
    },
    {
        photo:"https://i0.wp.com/catagua.com.br/wp-content/uploads/2022/05/conheca-as-vantagens-de-morar-em-um-condominio-com-academia.jpg?fit=1024%2C683&ssl=1&is-pending-load=1",
        description:"Mais um dia de Luta",
        timesTamp: 1674074750,
        autor: {
            name: "Samara Lopes",
            username:"samaralp",
            photo: "https://osegredo.com.br/wp-content/uploads/2017/09/O-que-as-pessoas-felizes-t%C3%AAm-em-comum-site.jpg"
        }
    },
    {
        photo:"https://www.infomoney.com.br/wp-content/uploads/2019/06/festa-mulheres-.jpg?resize=900%2C515&quality=50&strip=all",
        description:"Hoje a festinha foi muito boa!",
        timesTamp: 1673179820,
        autor: {
            name: "Maria Letica",
            username:"mariall",
            photo: "https://www.tribunapr.com.br/wp-content/uploads/2020/08/16145536/jovem-feliz-freepik-ArthurHidden-1.jpg"
        }
    }
]

for(let i = 0; i<posts.length; i++){
    let post = document.createElement("div");
    let perfil = document.createElement("img");
    let username = document.createElement("span");
    let photo = document.createElement("img");
    let description = document.createElement("span");
    let data = document.createElement("span"); 
    
    

    perfil.src =posts[i].autor.photo;
    perfil.className = "perfil";
    username.innerText = "@" + posts[i].autor.username;
    username.className = "username";
    photo.src = posts[i].photo;
    photo.className ="foto";
    description.innerText = posts[i].description;
    description.className = "description";
    data.innerText = "Horário da Publicação : " + new Date(posts[i].timesTamp*1000).toLocaleTimeString("pt-BR");
    data.className = "data";

    post.appendChild(photo);
    post.appendChild(perfil);
    post.appendChild(username);
    post.appendChild(description);
    post.appendChild(data);
    post.className = "post";

    document.querySelector("#posts").appendChild(post);
}

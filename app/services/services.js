function Services(){
    this.fetchData = function(){
        return axios({
            url: "https://6255692152d8738c692171c5.mockapi.io/api/qlnv",
            method: "GET",
        });
        
    };
    this.deleteND = function (id){
        return axios({
            url: `https://6255692152d8738c692171c5.mockapi.io/api/qlnv/${id}`,
            method: "DELETE",
        });
    };
    this.addNDApi = function(nd){
        return axios({
            url: "https://6255692152d8738c692171c5.mockapi.io/api/qlnv",
            method: "POST",
            data: nd,
        })
    }
    this.getNDById = function (id){
        return axios({
            url: `https://6255692152d8738c692171c5.mockapi.io/api/qlnv/${id}`,
            method: "GET",
        })
    }
    this.updateND = function (nd){
        return axios({
            url: `https://6255692152d8738c692171c5.mockapi.io/api/qlnv/${nd.id}`,
            method: "PUT",
            data: nd,
        })
    }
}
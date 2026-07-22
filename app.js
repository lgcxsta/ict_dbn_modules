var app = angular.module("affichageModules", []);

app.controller("affichageCtrl", function ($scope, $http) {
  $scope.chargement = true; // chargement des données en cours

  $scope.ouvrirPdf = function (nomFichier) {
    //fonction qui permet d'ouvrir le pdf
    var lien = "https://www.modulbaukasten.ch/Module/" + nomFichier; // url de chaque pdf (nomFichier = item.beembk_Modul.beembk_pdfname_fr)
    window.open(lien, "_blank"); // Ouverture d'ne nouvelle page dans le navigateur, qui permet de visualiser le pdf
  };

  $http({
    // requête https
    method: "GET",
    // prendre les modules directement du site ICT (avec une autorisation TEMPORAIRE):
    // url: "https://ictbb.crm17.dynamics.com/api/data/v9.1/beembk_modulmappings?$filter=beembk_Abschluss/beembk_abschlussid%20eq%20%273b900e4d-1667-ed11-9562-000d3a83015d%27%20and%20statecode%20eq%200%20and%20beembk_Modul/statecode%20eq%200&$expand=beembk_Lernort,beembk_Modul,beembk_Modultyp,beembk_Level",
    // headers: {
    //   Authorization:
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFGa21LVkZjLTRXVjZzWENCdk5aa1hJNTA1WSIsImtpZCI6ImFGa21LVkZjLTRXVjZzWENCdk5aa1hJNTA1WSJ9.eyJhdWQiOiJodHRwczovL2ljdGJiLmNybTE3LmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzUwM2JhNzU2LTc4MTQtNDhmYy04N2U0LWQwZGNkN2MyNzk4MC8iLCJpYXQiOjE3ODQ3MTA3NjIsIm5iZiI6MTc4NDcxMDc2MiwiZXhwIjoxNzg0NzE0NjYyLCJhaW8iOiJrMkZnWVBqY1diZTlUNW5oYVphODBackh5ZE0xNU80MHBmTWNOYnlia2plNWJmNVNRV0VBIiwiYXBwaWQiOiIwOWEyYjUzNi1lMWNkLTQ5ZmItOGI4Yi0wZDc4YTcxNGJhNDUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81MDNiYTc1Ni03ODE0LTQ4ZmMtODdlNC1kMGRjZDdjMjc5ODAvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI1ZjZlOTNhYi05OTc4LTQxYTctYmZjYy05MDM4MTVlYmRlNDIiLCJyaCI6IjEuQVRFQVZxYzdVQlI0X0VpSDVORGMxOEo1Z0FjQUFBQUFBQUFBd0FBQUFBQUFBQUFBQUFBeEFBLiIsInN1YiI6IjVmNmU5M2FiLTk5NzgtNDFhNy1iZmNjLTkwMzgxNWViZGU0MiIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJFVSIsInRpZCI6IjUwM2JhNzU2LTc4MTQtNDhmYy04N2U0LWQwZGNkN2MyNzk4MCIsInV0aSI6Ik9hX2pPR212a1VlalRGZHJzbGN3QUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfYWN0X2ZjdCI6IjMgOSIsInhtc19mdGQiOiJmTUI0SEFpcEdseC1IMm1paF9yb0NSZ1hLS09GakxIdXVNVlhYbkZLTUpnQlpYVnliM0JsYm05eWRHZ3RaSE50Y3ciLCJ4bXNfaWRyZWwiOiIxNCA3IiwieG1zX3JkIjoiMC40MkxsWUJKaU5CUVM0ZUFVRXVoTEtHTVhDWnZsdk9Mb24tYTU0Y1kyUWlJY0hFSUM3QXdRY0FCS0M0bHdjQXNKNU52T0QxaXh6MnNOczNKV1JqYTd5d0VBIiwieG1zX3N1Yl9mY3QiOiI5IDMifQ.dNtcZDSFW7BDU787w6eHZPQsyftNadGuptDb41lB1M_PPzVfa4lUJPQLnRMsSo7ec6_4vzHavuFuFLT9ECvhWXWQVVnX0vOeaB6tpMT0Mer5BsmthKbYxGPrxx_uMdapCXLPfq3iOFYIcVHAkLItggMEcCd8NTuK7oHxQVhy-jShPPFt3wXs_4wStODw-SLLnqUW-ythggaDr9VTTXeex9N-3wXDbtkBsAeuBTylvvlDJHxQYAsYYw1D4_hIy_3hjcT0PgdJwsL0QDgcGMvyBYBrOiNrTd2GJXBQ0zPoWXxFqazTPT7sMJiL_l1dGzI3XYWFBXcty4o1x6laM_jbQg",
    // },

    // ou utiliser le fichier json pour avoir un fichier local permanent (données récupérées du network -> beembk_modulmappings)
    url: "modules.json",
  }).then(
    function successFunction(response) {
      // reponse positive - les modules ont été trouvés
      $scope.listeModules = response.data.value;
      $scope.chargement = false;
    },
    function errorFunction(response) {
      // reponse négative - les modules n'ont pas été trouvés
      console.log("Erreur :", response);
      $scope.erreur = true;
      $scope.chargement = false;
    },
  );
});

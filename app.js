var app = angular.module("affichageModules", []);

app.controller("affichageCtrl", function ($scope, $http) {
  $scope.chargement = true; // chargement des données en cours

  $http({
    // requête https
    method: "GET",
    // prendre les modules directement du site ICT (avec une autorisation TEMPORAIRE):
    // url: "https://ictbb.crm17.dynamics.com/api/data/v9.1/beembk_modulmappings?$filter=beembk_Abschluss/beembk_abschlussid%20eq%20%273b900e4d-1667-ed11-9562-000d3a83015d%27%20and%20statecode%20eq%200%20and%20beembk_Modul/statecode%20eq%200&$expand=beembk_Lernort,beembk_Modul,beembk_Modultyp,beembk_Level",
    // headers: {
    //   Authorization:
    //   "URL du token temporaire ici"
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

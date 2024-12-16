export const tipoSeguro = [
    {
        id: "terceros",
        tipo: "Terceros",
        precio: 500
    },
    {
        id: "tercerosAmp",
        tipo: "Terceros Ampliado",
        precio: 650
    },
    {
        id: "franquiciado",
        tipo: "Con Franquicia",
        precio: 750
    },
    {
        id: "todoRiesgo",
        tipo: "A todo Riesgo",
        precio: 1000
    }
    // Tipo de seguro (Terceros, Terceros ampliado, Con franquicia,Todo riesgo) | Precio base tipo de seguro (500, 650, 750, 1000)
]


export const tipoVehiculo = [
    {
        tipo: "Diesel",
        penalizacion: 20
    },

    {
        tipo: "Gasolina",
        penalizacion: 15
    },
    {
        tipo: "Hibrido",
        penalizacion: 5
    },
    {
        tipo: "Eléctrico",
        penalizacion: 0
    },


    //Tipo vehículo (Diesel, Gasolina, Hibrido, Eléctrico) | Penalización por el tipo de vehículo (20%, 15%, 5%, 0%)
]


export const comunidades = [
    {
        comunidad: "Andalucía",
        provincias: ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"]
    },
    {
        comunidad: "Aragón",
        provincias: ["Huesca", "Teruel", "Zaragoza"]
    },
    {
        comunidad: "Asturias",
        provincias: ["Asturias"]
    },
    {
        comunidad: "Islas Baleares",
        provincias: ["Islas Baleares"]
    },
    {
        comunidad: "Canarias",
        provincias: ["Las Palmas", "Santa Cruz de Tenerife"]
    },
    {
        comunidad: "Cantabria",
        provincias: ["Cantabria"]
    },
    {
        comunidad: "Castilla y León",
        provincias: ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"]
    },
    {
        comunidad: "Castilla-La Mancha",
        provincias: ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"]
    },
    {
        comunidad: "Cataluña",
        provincias: ["Barcelona", "Girona", "Lleida", "Tarragona"]
    },
    {
        comunidad: "Extremadura",
        provincias: ["Badajoz", "Cáceres"]
    },
    {
        comunidad: "Galicia",
        provincias: ["A Coruña", "Lugo", "Ourense", "Pontevedra"]
    },
    {
        comunidad: "Madrid",
        provincias: ["Madrid"]
    },
    {
        comunidad: "Murcia",
        provincias: ["Murcia"]
    },
    {
        comunidad: "Navarra",
        provincias: ["Navarra"]
    },
    {
        comunidad: "La Rioja",
        provincias: ["La Rioja"]
    },
    {
        comunidad: "País Vasco",
        provincias: ["Álava", "Bizkaia", "Gipuzkoa"]
    },
    {
        comunidad: "Valencia",
        provincias: ["Alicante", "Castellón", "Valencia"]
    },
    {
        comunidad: "Ceuta",
        provincias: ["Ceuta"]
    },
    {
        comunidad: "Melilla",
        provincias: ["Melilla"]
    }
];



export const marcasModelos = [
    {
        marca: "Toyota",
        modelos: ["Corolla", "Camry", "RAV4", "Highlander", "Prius", "Yaris", "Tacoma", "Tundra", "C-HR"]
    },
    {
        marca: "Ford",
        modelos: ["Fiesta", "Focus", "Mustang", "Explorer", "F-150", "Edge", "Ranger", "Bronco"]
    },
    {
        marca: "Honda",
        modelos: ["Civic", "Accord", "CR-V", "Pilot", "Fit", "HR-V", "Odyssey", "Ridgeline"]
    },
    {
        marca: "Chevrolet",
        modelos: ["Spark", "Malibu", "Impala", "Equinox", "Traverse", "Tahoe", "Silverado", "Camaro"]
    },
    {
        marca: "BMW",
        modelos: ["Serie 1", "Serie 2", "Serie 3", "Serie 4", "Serie 5", "X1", "X3", "X5", "Z4"]
    },
    {
        marca: "Mercedes-Benz",
        modelos: ["Clase A", "Clase C", "Clase E", "Clase S", "GLA", "GLC", "GLE", "GLS"]
    },
    {
        marca: "Audi",
        modelos: ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "TT"]
    },
    {
        marca: "Volkswagen",
        modelos: ["Polo", "Golf", "Passat", "Tiguan", "Touareg", "Jetta", "Beetle"]
    },
    {
        marca: "Hyundai",
        modelos: ["i10", "i20", "i30", "Tucson", "Santa Fe", "Kona", "Elantra", "Sonata"]
    },
    {
        marca: "Kia",
        modelos: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Niro", "Stonic", "Optima"]
    },
    {
        marca: "Nissan",
        modelos: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Navara", "370Z"]
    },
    {
        marca: "Mazda",
        modelos: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-5", "CX-9", "MX-5"]
    },
    {
        marca: "Peugeot",
        modelos: ["208", "308", "3008", "508", "2008", "5008", "Rifter"]
    },
    {
        marca: "Renault",
        modelos: ["Clio", "Megane", "Captur", "Kadjar", "Scenic", "Twingo", "Koleos"]
    },
    {
        marca: "Tesla",
        modelos: ["Model S", "Model 3", "Model X", "Model Y"]
    },
    {
        marca: "Fiat",
        modelos: ["500", "Panda", "Tipo", "Punto", "Doblo", "500X"]
    },
    {
        marca: "Jeep",
        modelos: ["Wrangler", "Grand Cherokee", "Cherokee", "Renegade", "Compass"]
    },
    {
        marca: "Volvo",
        modelos: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"]
    },
    {
        marca: "Porsche",
        modelos: ["911", "Cayenne", "Macan", "Panamera", "Taycan"]
    },
    {
        marca: "Subaru",
        modelos: ["Impreza", "Outback", "Forester", "XV", "BRZ", "Legacy"]
    },
    {
        marca: "Land Rover",
        modelos: ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Defender", "Discovery"]
    },
    {
        marca: "Jaguar",
        modelos: ["XE", "XF", "XJ", "E-Pace", "F-Pace", "I-Pace", "F-Type"]
    },
    {
        marca: "Mitsubishi",
        modelos: ["Mirage", "Lancer", "Outlander", "Eclipse Cross", "Pajero"]
    }
];



export const codigosPostales = [
    { provincia: "Álava", inicio: "01000", fin: "01520" },
    { provincia: "Albacete", inicio: "02000", fin: "02696" },
    { provincia: "Alicante", inicio: "03000", fin: "03860" },
    { provincia: "Almería", inicio: "04000", fin: "04897" },
    { provincia: "Asturias", inicio: "33000", fin: "33993" },
    { provincia: "Ávila", inicio: "05000", fin: "05697" },
    { provincia: "Badajoz", inicio: "06000", fin: "06980" },
    { provincia: "Islas Baleares", inicio: "07000", fin: "07860" },
    { provincia: "Barcelona", inicio: "08000", fin: "08980" },
    { provincia: "Burgos", inicio: "09000", fin: "09693" },
    { provincia: "Cáceres", inicio: "10000", fin: "10991" },
    { provincia: "Cádiz", inicio: "11000", fin: "11693" },
    { provincia: "Cantabria", inicio: "39000", fin: "39880" },
    { provincia: "Castellón", inicio: "120002", fin: "12609" },
    { provincia: "Ceuta", inicio: "51000", fin: "51001" },
    { provincia: "Ciudad Real", inicio: "13000", fin: "13779" },
    { provincia: "Córdoba", inicio: "14000", fin: "14970" },
    { provincia: "Cuenca", inicio: "16000", fin: "16891" },
    { provincia: "Girona", inicio: "17000", fin: "17869" },
    { provincia: "Granada", inicio: "18000", fin: "18890" },
    { provincia: "Guadalajara", inicio: "19000", fin: "19495" },
    { provincia: "Gipuzkoa", inicio: "20000", fin: "20870" },
    { provincia: "Huelva", inicio: "21000", fin: "21891" },
    { provincia: "Huesca", inicio: "22000", fin: "22880" },
    { provincia: "Jaen", inicio: "23000", fin: "23790" },
    { provincia: "A Coruña", inicio: "15000", fin: "15981" },
    { provincia: "La Rioja", inicio: "26000", fin: "26589" },
    { provincia: "Las Palmas", inicio: "35000", fin: "35640" },
    { provincia: "León", inicio: "24000", fin: "24996" },
    { provincia: "Lleida", inicio: "25000", fin: "25796" },
    { provincia: "Lugo", inicio: "27000", fin: "27891" },
    { provincia: "Madrid", inicio: "28000", fin: "28991" },
    { provincia: "Málaga", inicio: "29000", fin: "29792" },
    { provincia: "Melilla", inicio: "52000", fin: "52001" },
    { provincia: "Murcia", inicio: "30000", fin: "30892" },
    { provincia: "Navarra", inicio: "31000", fin: "31890" },
    { provincia: "Ourense", inicio: "32000", fin: "32930" },
    { provincia: "Palencia", inicio: "34000", fin: "34889" },
    { provincia: "Pontevedra", inicio: "36000", fin: "36980" },
    { provincia: "Salamanca", inicio: "37000", fin: "37900" },
    { provincia: "Segovia", inicio: "40000", fin: "40593" },
    { provincia: "Sevilla", inicio: "41000", fin: "41980" },
    { provincia: "Soria", inicio: "42000", fin: "42368" },
    { provincia: "Tarragona", inicio: "43000", fin: "43896" },
    { provincia: "Tenerife", inicio: "38000", fin: "38911" },
    { provincia: "Teruel", inicio: "44000", fin: "44793" },
    { provincia: "Toledo", inicio: "45000", fin: "45960" },
    { provincia: "Valencia", inicio: "46000", fin: "46980" },
    { provincia: "Valladolid", inicio: "47000", fin: "47883" },
    { provincia: "Bizkaia", inicio: "48000", fin: "48992" },
    { provincia: "Zamora", inicio: "49000", fin: "49882" },
    { provincia: "Zaragoza", inicio: "50000", fin: "50840" }
];

export const restoDni = [
    {
        letra: "t",
        resto: 0
    },
    {
        letra: "r",
        resto: 1
    },
    {
        letra: "w",
        resto: 2
    },
    {
        letra: "a",
        resto: 3
    },
    {
        letra: "g",
        resto: 4
    },
    {
        letra: "m",
        resto: 5
    },
    {
        letra: "y",
        resto: 6
    },
    {
        letra: "f",
        resto: 7
    },
    {
        letra: "p",
        resto: 8
    },
    {
        letra: "d",
        resto: 9
    },
    {
        letra: "x",
        resto: 10
    },
    {
        letra: "b",
        resto: 11
    },
    {
        letra: "n",
        resto: 12
    },
    {
        letra: "j",
        resto: 13
    },
    {
        letra: "z",
        resto: 14
    },
    {
        letra: "s",
        resto: 15
    },
    {
        letra: "q",
        resto: 16
    },
    {
        letra: "v",
        resto: 17
    },
    {
        letra: "h",
        resto: 18
    },
    {
        letra: "l",
        resto: 19
    },

    {
        letra: "c",
        resto: 20
    },
    {
        letra: "k",
        resto: 21
    },
    {
        letra: "e",
        resto: 22
    }

]

/* Fuente para los inicios de los códigos postales españoles: https://www.metelidrissi.com/inicios-de-codigos-postales-en-espana-por-provincias-para-woocommerce/  */
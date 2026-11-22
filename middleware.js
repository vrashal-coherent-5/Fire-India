// Auth0 login gate. Fire and Drone each have their own session cookie, their own
// login (prompt=login, so an Auth0 session for one never silently unlocks the other)
// and their own Auth0 role. Reports and report data are only served to the session
// for the ecosystem the report belongs to.

export const config = {
  matcher: ['/', '/fire', '/fire/:path*', '/drone', '/drone/:path*', '/adhesive', '/adhesive/:path*', '/profoods', '/profoods/:path*', '/healthcare-pharma', '/healthcare-pharma/:path*', '/healthcare&pharma', '/healthcare&pharma/:path*', '/shared/:path*', '/api/:path*', '/auth/:path*', '/index.html'],
};

const IDS = {
  fire: ['5c5554e08fd56ca5e0f53fcb','4363fea5254c96601438c964','7401cc97dcaac538fceabbd8','880ff6af70d7225cb4cdefd2','2fe8bf8f72cf0896dbd27931','fbbe54c36994bdd98559b60a','838ac4df67fd28a3b0220497','8d4e25ca9f72f33ae2d34118','83085f668d9ad8def2b3ff0b','275958c68bf24c853e97526a','9b8793de7b99cfb4b0ddb754','bcb4a53a9ed56b700e042546','cee58afdbf7a274842fb92d8','8c5c4c2b50eb5478d7215fdf','f198d984ab817383192497da','dfe0dca378538c941a579b39','2c7282c554e431ba271018ab','e129c07b28ea36e763fd1a38','a180cc086a444afb48bc552e','17410ddd30de45f0a31fdab8','7410559951d9fc2cd38ec5ce','63be66c6a73530ffdf737bd6','269e327068ad045b72f3e89f','d1d54383cdbceed4f98e4655','6ab734759041a0a01bbdb311'],
  drone: ['794643a37c1b8b8941e1fe20','caa29fde63afe414f3e02797','1005dac62aa4a5908103614c','0045a0e8008d3035b54fc2d7','71f14906d069058a1b674cb2','089808417bab32e3babd59e6','5216a5d851768ebd0b6f0b49','bf67d756b95acbff667557b6','f76f5bf292564532d3d7b7bd','70794012835421e92a77d65b','0011de38a3eac1cedbf6734d','fa2ab84532d5245e3e9a35c2','161c420ca349a076f7c9818a','dfa781d2493b6f7127239915','5f49d5b5a8503699e994f8ef','f016a05eb1fc88198a547e68','39d287dbfbba2f1f876cf208','cd695bdb740a552359a401a0','15b04c703a468a93f33083bd','05e97971de692dabc534ea37','aee48e8ac7f8d723ce6000b9','3d27e979b3b291a868fad634','8240120e5ba386d44a564691','361d2434245d6d31a89c9b1b','255b49318d003f2180fb3b52','f27540157319f4b0ca368471','02d7219c369037c106e08582','aa98673701ccd68ec0f0b16a','8c3584d9c260d0c196092946','09df29b8201c5c48ac56d166','887ac2c49d03c9fc8bbc5613','85125963c67d3d424bed8c4e','8012a01314a05c377fdca506','6949ac5ae81304e76a8caeb4'],
  adhesive: ['8b4e5f59cabe714abd99d68c','ba407a365504698f156412c6','7afecb8d120e26e25fc34ead','759ad4e2bb3e5b9d7a4cee7e','43fa2b91bf5d813c94408eab','93b38e34cf66dcb632e5f220','b2e100b3cf0f5e96c6387434','5dcff82f96b1daefc935b242','c0677265b4d58257e358ab0c','6f68c23990944a044bd9b471','db2267703c8783df43d42f05','eb578e5c03c0ed97eb107db5','fa164fbf0016aca7917a001b','9ee20d87e49bc746626f4300','f48a07f4f4bfd03ff641e795','0f68cc1980d35afbc27d35ea','388ecb5a89553ff9ae334ddf','e6f143edaaeb30d0e5bf5a57','39b41ffaa81bc21cd7187684','4bc49711c2d336db20e4176a','29b95cda0f6811170c579b76','063d295864d2ad82beacca25','7c4c628204a203bb38ff8c5e','534755827c04aab72f1ece1e','d67b6c4bd265fa13e1976780','297c83878d0649382fcea690','15a6201bbbcbefb8fd8d6746','182781e84c93868e734dcdce','115c18383a50f279f0edbb05','0febe55cd8ac152e21950788','c95eb94e31e61d327cd1d652','07df906b842e5713e726baad','18e435533344a54b51f33b73','4c4ed84d333261ba68731377','c41d2b8d1e678c1d94b2e171','ac53bcdf2ea6b0d7a3118399','8eae7eaeea5303a5e1852664','cf4729f3f9def5521675724c','37107f0a7e7916734cf3eab5','0bebddec095878d894929b62','8c38d5af73fa7aea1d1e8b0f','8c103d9c69fcbf6523fb5058','e424ef9efc17e31fa0d06184','814cb825b62371f1e15c177f','27adc867927747b4a038c2db','8fbeb0d0257eb2b522fbf859','e7bf0fcf5e99a7fb38e32dff','cd664ab795136ffb167488da','586b2743b4fd4ba76d88118b','b97a3cd0cd7ed068746b0d16','b1552ce23b8c8ad3d48b3ce8','313edc6f97387015b0ea3bc0','3ed9ff8cb16f270e6995dba6','27ce5b9fc19491cc02ff59ed','b8b02ee003803f706e6a27b4','fb4a9ee0ef9245d1b6a47767','23875f8d1d0845ec97fc5d89','d9ab5fbfb9ff246bdcd4063c','784d4cf7102ef6efbef1694e','805f1e24149391c8ef03f6a7','8d0fc809398d64540f348f65','44a42ec435c44fec29152270','55443d9927cb2c39e6f02375','cd34212e8598df2fc69c39ce','c2a5f265c6b0d95b4646e783','57e1bb8ccca2e2be7d010ca3','98ae655969f6f761bf01ea9e','97a149a6ece91daa5b23f2e6','f868d58d4ca635ac49859dfd','0c635563b82966e2bd19e1b7','87b9662e956f8a14d2a20896','d93122da07aa1739e27ec1c1','3134d5c4b7a3a62bfe3e14fe','1cc6f76be9ef594a5d6aa34d','442317b96d47011cbe5edf93','571a9051aa43b5b66ff01f10','d3903fbae10f1b6d5711bde4','feadf1f7193f5a3dac038898','9979380877438956a55335ce','ef46dfaad91ec6f3ecebc2f8','81c3ab406b6bb07fafd089e6','4afe7bfe8504fc8c2600b7eb','b6ad295222c435c199dc390f','6573662eb60869589ed59fef','e9c288d00b790d1b69490220','09aef5bc8de1680689daaeef','10a0c520d44000f445209ab6','f9b2863385b111d496ea6417','3009b15a592eeaf47e0ebea0','70060a1d64856c9eb7aa461d','33a40ba7c60c2850c862a122','85ac342b280f505a94019d75','c8787023f4e4671f0e5882aa','a150eb93f457629ff29d5612','6f130be73c0d25b8e5eb073c','dca23d5642df582bc9c3e0d5','1fde57fe80b375a5ad2596c9','ded9ba6f32dd330525c711b8','0bce639855b26b5be9f21ce3','0721fabf446056e129ba25dc','fbb7b34293d40e6ea7508096','efb4796b37472df94a490ece','297ef0c875e1c64f6942f073','a1138992f48ba133dd220151','a574ef8b16158c4cb970f44f','3f440c9d2bde465630b3b73e','f0b7af6d87b0350f884a153b','0073f0dae8bd26b919368922','1d15af1bed67b2b91eb97db2','36d7ed514fdcac9ff39f26f2','e5a131b174a6c2633b883122','ca79b5846b97ccd58afd14e8','67518cf12210d7810f67bfe8','12f8652a89b17cb2c76de541','c8d702580afe27c3f8bf8b6c','e6a44ad52c5992df793cb789','8265e66fb652005aa7d8e58d','e04352501b45613b32bb144f','08ffe0f85fda0af7cac34e8e','10e6414ad27d704abfee079d'],
  profoods: ['eebf31eb6fe641aa0d98f789','13a73848dc204fa3606115fe','807deee582a31066d721b773','9122591526cf6bea3cc2a7e2','d9c6e1004e4eb89fd4806b00','dc7944384dddcf7a07d7b9b5','ad567a60b2db0fab812ed947','dc1b2d672a6e78ca01b7ea13','16e96783b255ee7be8a9c08d','642ef256615eeda0a789fcc5','77a6405d46d2c3681ba6aa47','4bbe8fdfa1a71f2727c4c4e0','586d86c472044aebbabbade3','e3db9426060153ef9eb05ae4','fe8bc9c54b12f8478d15d48e','e3fe43101c7a83793618741e','7431fd71612dc4f008667755','66da747d4f9330f77c314a32','f444becf45293b83a81eb0a6','95c6c429e2df0451ed78bb1c','1be9afa8f274405cd0768839','cec23397c184c1aed5ff72cf','ed1e796758fa682f159c2db6','6a7ae3d27576336cf8409f5a','b2922458101ca3b98610b85a','7cb382bd3e61bcddb7a20617','17a6ebcc9e2ee70cf6109be0','d950af9beeb69324eaee5c7b','c188e47a71427c1e2fdb75db','712256e62da16e8f7de4c368','65273a137c50d34fafebd594','8d225864c01c5aa460ee8491','87b01840ebcd7fe8920548e7','8371174f5a73f6bed8a1f2ee','c0c44b6d886747a44c4d0e60','94e218f6757a8f274aec2bf7','19f5ad73f336548e0afb60a6','26b18a14467fd676e95a70fb','eedea3795a93938e551696cb','187b3493a068b923d858b0fb','98da3279c3ead13eb54379c1','74b6fba34b4a743fe1444484','50c122539d9cdd54effb82dd','62364f4b895a12aa1f124972','361687a9c359c03a88b4d989','dbeb47044be4b8aaa9960569','f80999e647d84d6e5a1f5548','6905cfa849ef7693a4e51884','6ad37844a5b393bba73ad545','15b52ba428d90731217590ed','c66a2f8e1c72d6af3ac2da54','dcefe89cf219c15546333c0e','48b59ef721c9a974a83d11ed','3c8ec56784e6db10e9b9096c','828c92a58900e2a61425aece','28991f5b8255b222ce96359c','c7bddc0b11900415f2b1f474','82069639f14bdb4f18794a76','744fc55b3e7170603115592b','5049bb6be3fbc865a743741a','d0b5e6b4305ce1109d2609cc','edbd7bbd5f0a130cee8c6e3f','09d2a5db5b1fd131cfb38c24','698e2bfadeb00f15bcbf1ee0','79b1e00c4d666c85912dc536','864cb53f085350e6780d8c6d','652a717d2a5c6bca4f0f800e','39bcaa5b1d8b496dbbeb1a9d','f52522c9f970998cfb567a39','f3dd5dc52fa4d1301c3b942d','e39c0b439f049c2ddc2d15aa','8bdd4015d6a2086ca4bd1e1d','c7305220d590641f476ecd27','950a09f51d70868017784560','9554f8879d2068189aeecd7e'],
  'healthcare-pharma': ['3f3cc2f4901be28c3f9abc7e','64019dc185a9fbfdda8dc699','c6ce7e44104ca6339a2689a8','28964f3bfd5779d1fb82c7be','5d5f351051eab97717927089','af65b80b811fbd107838406b','4004a0e187f7feb823019db1','12898f9800476db169e126a0','1ced652a0215d572e0cd668a','49d57b8f9d5b39b6cb2c0278','f5f68c52ca10d6e00337860f','ad4d0f76c27b4f0c8b18f5de','8ea8279ed3ce6dbc31225187','aabd306adb7f6db5c6ef5a49','de6dab32e0d2749455ac0a30','f574f8850eab4c55227bfdd5','c55580a631c2da7db475c453','3bf08cd160ff1f9f7098425f','7216eb975fdcab87fc3c66f1','aa21d6aaf0750f17d6fd93b7','88e893838ef8bb8301e3e942','21a372d8a92a08a124ab3694','03f7a7499aa29965a4dc10e5','ecebd8148728270bb7b6ae3e','58e6d1af7f08baa33f22c35c','89ad72a44e21ccedd96a033f','9a7d17f38825ea403d8df7a1','6186d1353ef2489681ec6224','7e4a51f1874509913c53f267','2bd2e5f50be6f96220175da3','5c9f1a379769751d8bf6b021','113c0e904ad388b8245ff8a5','c4e2661a366f47276324e4ee','865002cec351fee7efb043af','edebf3cb7cca801513308af9','5d98572a3700a71139395588','c5ca2b7e5d71b09944550167','8d11e08e7190dbefb9276e8a','f1206a73720d1d26f3038e10','04a6f2eda76ee4c888f3b224','3f7e13853ca046f4545564d6','032d4d379a1f50df0a5e359f','c9481c9e290fc79628a4e1e7','d4057975e1e5f115cec2e9d6','735856660e799fbbbb1fc843','65c0c21c1f280fce026b1507','f4d74282b22c07fc6f04d8e8','8438fe0423ad744cb244d372','01db72074a45e7ea1666af8f','6681522988a3f71d0b7da8db','7c3a3910a67ac2a3ceb24357','da44d2fdcd8588fcecb3dd59','58dd841083f4da5e5670ed1c','70d6ce59a5ec7242fa2034a2','d14f136e5bea9bae4caf3a0a','cb4e1c2ed2a46535a9902400','31f30ce672b544547b9b89f7','6c5dd15da08a2978463954b5','23c30be5baaae78b26e24ec7','5c154a3469d5af19bbf60cf8','0dbb78deb0b07a69878c6630','4bdccf22e51bd3fd15c31e6f','6d6e0546195914d99e32a1b3','062ef208ab1844894bce44f1','3248e57266660671c99d39b9','c89a4314de6cf8f54b46dc36','549a4d9f52aaf98ca158781a','e4e2fd500b7bd5dbb11af779','40bfcdddde7431abcaf42a5f','90f4fe9f26d0b7ea95e816d3','0fae77e25f9a80cc81c2ea55','789eb1cf737d5d1b2b985248','85226b23aec6858673c92744','a3ab6c0e8afa61d8049be16e','811a64d588a0e239c69e36bc','d0d5e45f420a93f349f9cf8b','09170d7f5cd2ce81e20ee802','edf2647c5cbff327c4d181b0','81c959afc2d8b3a390a187d3','9961c8e5fe7c0997451f6c14','89c0fa9b5ea9c0ef0fa8c720','941a4ecfd8746f2df568dfda','b88a72614715cbd7e56ba358','2cdc836aaa6fc6d3badaef5d','b7c092c2a5c8dec57e293d93','60f080855daea4b5f0e8d4dc','b9eeb8c1aade7e99aa7b3511','a45c4e6d7b99afe8bc956e98','e816bba1e2fae2205065087b','c34180bd2a73974d2a2f1c1c','c1ed29a50eb86dec525bbcdd','6836c0be3cdfd77dcb1a0ead','5cb2c33d3ca682ca576c7b15','8a53f22e1c30569a5fd98e61','70e3a4f638ba2da3bc67472e','fa793a3b5123bafe64e55c2e','c7f5bd4bd586f8930bd9b1bc','5b97daef96cbe9af86fea5c3','dd9d73eb7c9bdd0a827b7c1b','a9f6101669f1ffb8d62d26c3','ff89ad5c84f76a05b3610d15','1002dc22b85418cc934812b3','f35a77a03f131a46677fb2e5','abe05ee5f29fe2ed2b188d5d','baa43e9f1361f89367664d1e','081cb984a5f7cd983e7e2bda','4b1eb938f4fb2a1e8874e3dd','cbd74aaccaac7ff8a3d17001','231e521a70e8177c179857d1','c2e5ad7981fdae32c8cc249a','4321744c0c2e2528c6d84bca','417e8b7592106efff360e9a1','ee8e2572478beefefe811728','45179958c3f44178e842c734','c097fe3e0ab43cd1540881ab','02485f164187896ee9920fde','b065fbc3159aa40668e290da','fd4132763e51dd3df2bf3d5f','1d03749af1172bdc3158405b','f30b0d16ceed84fba73ffd5e','3644685dce42a49727524d5a','f916296884414e0f4ee2220e','9ad6d89d5bb59bcab3426475','d5dcf210f17f733c4a13fbfe','efa1c1bfc8cbbc34298011e7','21996761f077a7d772e3a9a6','fa8a8af6ecf618dc3e75e835','40d0ae496976de326a201a97','00314dc4cdbd9dde5ce42f4c','970a558205b75c5bf90491d0','411e296bc7b32717296bf6ba','93ef3169b8f84860f63224c4','99bb1ccfd25a6612bae24f8a','1ebd9cc8dba59a05c4d6c79c','ba69bd26067ca569d6cac6a9','5324a2cda37003ef3dbda223','a98d5a06ddfde828396065f7','6dbc442d3dedfa1dd24d2e04','be76abb55c868771bafaee62','9ed54fa0932de4699c0865b9','45a19a2856bbabd57436f857','3c4723db4bd6054f93695c74','a19e1b37cd828e4d1121d008','bc88e3346de0026cc2f7b2c2','470cf0595f9d80dbf747da21','ef780b6480a2c94af790d1be','87e586b87e7b546e966e86dc','1d1c4d7ec0eaefbd167f0809','94bbc55cdf0ef8fe9f418caf','3fdc7ad08b635831d05f53e0','145de3464d7ced0bbabaacb7','4522a513b6aa17491957a26b','fdf92a2458b605f36739dfb3','5474db23467c65af4d023042','7d1d9a5a7365793cd1a31917','af84254092fe857aa55d9523','a90c3c29a6de8fcb207406a2','a56ef5b6073d3d5d0693d6a6','4c9c72fb2023170c62bc85f2','931a6fd14be1112eb98f8b70','caf8130f5b04c3963df18c1a','d16f6cba35f5193fb4c339b6','22a80708322b3148704a4a17','1f82c65e0d9a706f90df00c5','e165c10ca26a3771f1bd5314','6dbae1625ec81e6b17e98d21','ff233913af50dbdb11e8a9c7','f9dbe42551be1fac72dbe5df','65784a27131d92f13feec240','e051523a02bc0a7a2982e51f','2817b57ca18cf312a5766a90','42d4f24cba6f564182fd3439','cc7aff3204e314bce584a371','08b807a1221d8f8248de1453','23051139ab54241ce8c198d3','73150b37a88c65257d91c7cf','9fdc583cb162226f13dacd68','52658b127738828c3a39372a','c53c00860a09b3189e47fa48','5eca734a2808364f0c450b98','8f52810955916022779b7553','99ab23e543c02e777c857ee2','bd23f27ce31592dde5b2252d','1010bb2be0fa5968b74850fe','53971f3ff67d4389baa6dc88','775eec580365c60ab7c566b6','6a056bb95229adf9e9157bd3','8864e1082da755336ba22400','1eb0c9a9bcf2dfae60f9f22b','7754c50a308d1982b378c4b9','dba25db9874a4cf114469667','8f975847358d69a9a0a66ebb','94ee2a85230012101d1584db','5bbb2998ad698c04457d8552','faab2ca6e52c5fbf7a60fabc','4589442e953322697516f1bb','213d57fb62199c7b15022f9b','937a49e9d58885c8da791f19','cf6b5acbee20249ce95ae987','4ac888d3157f548be6f41950','fa97ad88ff6ae83ebcb81b55','fb31f33050db4a6c3fa560de','fe912a3e64ad2e40f9ef2fe6','ce00992d7c59b4d14c7fa8d5','125fb6432cc7e60d721be9fa','887419c873f2e01750c099fc','7a56d0b9cb184dc6389555d2','7d154d581b7f2693eafb1c41','d82ab5769db829eadfaa0157','44968a15f6a8f02bcd3a27a0','0bc8677d8495b165bc567c00','af98e10d39306c0d3c7d4c43','5e429bfff8d8a7b25e96a92b','d109042059c90f448194ad3e','acfeb97471006dfef805cc62','5870b504508dac3b26104778','5c90157662e718dc2591e24e','7197ce2c05e33a945addb741','ddc2cba07558edf6db3cde06','71ede8ff3fca0b5d7b063cda','1fd2e5c8ed58ffdcdec7d5db','1c67fb19a69e8d6d11a1ac35','30b3f7bf19a3d5663e50a177','401bbba1bd7e9abe7ab72935','9197423247b20f6e0bfa4d35','62ad22da0571c4c3686cec4d','549452bb8edb0af24240fb1b','ab224c234a26d9d795936db8','0db2558e01bc14c82f8eba07','1d87423225242bc4eab45388','46e20503ac7525828d5b6f39','e47a191f45c450fae7cc0368','00ddcb15c8d0a5ea4dcf4936','fe2b2303050f111e09f22e4e','8fdf47ead7d5d9aed0494802','119b363a9907fa1ee77c7a93','9eca17c5ce1399e86b56640f','164c7ebc8ce01ad3fd238a09','b9a29750cc242defcb464b11','b32f0ea6f26426296454bd56','e28fb60f8b091f7d0121ba5e','7fe3494d966a47fd510e9f34','31ce69f723b865519d8c4be1','90c02c227ed57d5db0796f44','aa7b0a2f40e11c23d92c43d5','70f5c8fab109b23dcf81667e','d4e23a0e4a82281fc089e8ba','6a1d34c2d8b03d86992f72bd','7a921b52e0bd10972f85ddaa','5e0fb337827236218e74087d','061e3747fb212376af7b9296','6ef91ddbb8a4b8a7c1510a8e','f61ad2fca58ed9a83de20881','37aace3f73adc75fc723fef1','e7698d106d7002908a8aabbf','c2f3252dc12bb2822991c69e','ac38da4155128f125d235a32','a786e84e0c7ca4ff95b089f7','0b01ccab25509f85c36f3952','f1b295eebc619e9f090ba709','6e49bf1db28a76e718fac41d','844f1be9000da9542b6b87c3','d37924548a3e473c924525be','eba0395dcb8f96069dd4b835','9f6eeb02810303404bc99a1a','06232b20ca7f3f13b5e6ecd4','d9ad948b9913a58d37df37b6','664b8bcb50ac0888d8928a1b','523d48063ff12df0ade94566','ddfc8e25a8a3eae7fa748466','2f7f20092c0b0d7a697c8181','c817f475f9a3b6969f4622fd','edb9c93a8b4ffe783c40064c','5ccc101f57294bcedc6bb340','8b90aac2cc2a867ac0d17e91','e75bc96b9d5c02617ae45e6d','209df51be69d75a5cbb41cc5','00e6ed2c6b7e4f08b72e3114','7c999df6827a64e0ce6bc9ce','ba6c97e93473370ce5c02286','2aad2dab2a4f3964a19c0fac','ff1fecabb140f51e2832b75d','024a219ae0a88dde504d942b','0bce15f6a760f4b94ab41efd','97544691a6b7db48fe73497d','c524bf2313512ef628be7c66','05ab1130b0f42646c45d333e','8a42e87f1313fc0e18e5a3dd','e291e097b4075a00d0b6b8c8','43ee3159a58af858d6609ff6','2958f1a621f64fa1d3f16dc6','b8a2f977d169727311020bf2','732d5391430e0798ccc24b80','59503fd910f7af8233cf5602','1f6a6722caafaaed34ba1235','544eb648a8e3aedb790a556d','352c7b53892d6699f707ca29','5aeeb43000e391440ddabf30','e0988e512c81d4465152706d','d7c190d30dd504bd44e34fd6','c83cd0c89ee172f9560e42bc','87838e590fbd02174b6d718e','7d34d2e62d52af46948d4c46','81a52abe991fc8bfeb6594c2','a42a825190a0db4a5de41d39','d62e0e5cbf1dff9080faf7d4','f8af7b8f790de79d346227ce','6e9f050006495b086641e58b','284b66092c69a016fbd58593','ab03f2811712e9639647eba5','ee9bb219bedc6e3f8195acd1','9cf19f9abfad985cbc6c0309','67e3986e99bd03c04ff7a2b4','8c3ef0ff671e392d7ebe8672','eddbd702e62092d3bcbf07d3','ca0449a4ca81907e47b87999','2fe655dce0cf86a20b960ac6','12abd8cc348b0a768af5a5e0','1f59b25e3617bdd15ae1c8e1','dd98ef2aa56a4246ba3e4d04','26b7d82390428a3e3348cec4','61640c17dad1c7a4b1150082','b3eecf5ee320bbec1d32350f','4f71e3ec6775829e27ec9ce3','2ff6a183542b2deb59485418','9cd1328cc8833ddbe32894fd','1cb444cd3cd4aebb140f4c1e','7781f0b5dc28de0f143b4ba3','146acb207265ecc7b3fb4cf4','0275ec34e4f5c5a4b38f6cfd','8983c9060135362544c72b89','f9dcd3e5c6d8914ec9c4ac91','695012c14c46e36f27b4ee22','b09f7083e9837bc19c167dc1','3e495b9e0407afd017c79991','a2faa44949b8bcdbf5a4bc62','1143b70af54f9753341978c5','6edfeba6c499bfde7ee4cef5','135558dfb2013ad7d3f633ed','523feafa9088ff738dee307f','1009616e37d168dcb7172f26','32061ad453f78cf5215b84cd','df958be2bf19e4288c043cd2','4edd2ffa2fcd738827d69b34','45201e51fd0d1c14ac6da963','a0d37add5d924eaef968ce95','21c9148b02d6b997d9432482','1efea26c8ea04e71fd65da83','7d0113dd9b5623ba7cde9965','2b25f9a72b4162a8e2dd7cb8','2c7c90c9e048ef10f7090d91','e8c543f9558e4449d6f6dc06','bc8319aa041a7c4cbbcc4f8f','7956c9078cd732dfbe36bf38','7609e60bb71cef5ce399e9e8','c54f60fb6dfe6724294527f4','c029dc1e7fdb6a77e9d3504d','9a92a2d54eeef1aee281c091','f8a13b7bfb0228d71701e9b3','c660426682cc41f1b5c64ffe','35ac1381b0195b46990b4720','8043f6dcf753fe11dfd67ad2','8a5f6bbe3e7e03522dc150b0','c08d5c9a811186774e9be732','b858e81b614e27c2fe5b9e20','1f5a782299b1a5f28ffa1e90','b1291e5ee5c83bb6cddff35f','4c235774beebbbb31a60cccf'],
};
const ECOS = ['fire', 'drone', 'adhesive', 'profoods', 'healthcare-pharma'];
// The healthcare path was asked for with an ampersand; that spelling redirects
// to the canonical one rather than living alongside it.
const ALIAS = { 'healthcare&pharma': 'healthcare-pharma', 'healthcare': 'healthcare-pharma' };
// Any one of an ecosystem's role names grants access, so a role can be renamed
// in Auth0 without locking everyone out mid-flight.
const ROLE = {
  fire: ['fire-access'],
  drone: ['drone-access'],
  adhesive: ['adhesive-access'],
  profoods: ['pro_food', 'profoods-access'],
  'healthcare-pharma': ['healthcare_pharma', 'healthcare-access', 'pharma_healthcare'],
};
const ROLES_CLAIM = 'https://coherentinsightvault.com/roles';
const SESSION_HOURS = 8;

const ecoOfId = id => ECOS.find(e => IDS[e].includes(id));
const idOfSlug = slug => (slug.match(/--([0-9a-f]{24})$/) || [])[1];

// ---------- helpers ----------
const next = () => new Response(null, { headers: { 'x-middleware-next': '1' } });
const redirect = (url, cookies = []) => {
  const h = new Headers({ Location: url, 'Cache-Control': 'no-store' });
  cookies.forEach(c => h.append('Set-Cookie', c));
  return new Response(null, { status: 302, headers: h });
};
const page = (status, title, msg, cookies = []) => {
  const h = new Headers({ 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  cookies.forEach(c => h.append('Set-Cookie', c));
  return new Response(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<body style="font-family:Inter,system-ui,sans-serif;background:#f4f7fb;display:grid;place-items:center;min-height:100vh;margin:0">
<div style="background:#fff;border:1px solid #e3e9f1;border-radius:16px;padding:40px;max-width:440px;text-align:center">
<img src="/logo.png" alt="Coherent Market Insights" style="height:40px;margin-bottom:24px"><h2 style="margin:0 0 10px;color:#0f1f33">${title}</h2>
<p style="color:#5b6b7f;line-height:1.6">${msg}</p><a href="/" style="color:#1f6fb2;font-weight:600">Back to home</a></div></body>`, { status, headers: h });
};
const cookie = (name, value, maxAge) =>
  `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
const getCookie = (req, name) => {
  const m = (req.headers.get('cookie') || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : null;
};

const enc = new TextEncoder();
const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlJson = obj => b64url(enc.encode(JSON.stringify(obj)));
const fromB64url = s => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))));

async function hmac(data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(process.env.SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
async function seal(obj) {
  const body = b64urlJson(obj);
  return `${body}.${await hmac(body)}`;
}
async function unseal(token) {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig || sig !== await hmac(body)) return null;
  try {
    const data = fromB64url(body);
    return data.exp > Date.now() ? data : null;
  } catch { return null; }
}
const session = (req, eco) => unseal(getCookie(req, `cv_${eco}`));

const loginUrl = (eco, returnTo) => `/auth/login?eco=${eco}&returnTo=${encodeURIComponent(returnTo)}`;

// ---------- auth routes ----------
async function handleAuth(req, url) {
  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;
  const callback = `${url.origin}/auth/callback`;

  if (url.pathname === '/auth/login') {
    const eco = url.searchParams.get('eco');
    if (!ECOS.includes(eco)) return redirect('/');
    let returnTo = url.searchParams.get('returnTo') || `/${eco}`;
    if (!returnTo.startsWith(`/${eco}`)) returnTo = `/${eco}`;
    const state = b64url(crypto.getRandomValues(new Uint8Array(24)));
    const auth = new URL(`https://${AUTH0_DOMAIN}/authorize`);
    auth.search = new URLSearchParams({
      response_type: 'code', client_id: AUTH0_CLIENT_ID, redirect_uri: callback,
      scope: 'openid profile email', state, prompt: 'login',
    });
    const tx = await seal({ state, eco, returnTo, exp: Date.now() + 10 * 60e3 });
    return redirect(auth.toString(), [cookie('cv_tx', tx, 600)]);
  }

  if (url.pathname === '/auth/callback') {
    const tx = await unseal(getCookie(req, 'cv_tx'));
    const clearTx = cookie('cv_tx', '', 0);
    if (url.searchParams.get('error')) {
      return page(401, 'Login failed', url.searchParams.get('error_description') || 'Please try again.', [clearTx]);
    }
    if (!tx || tx.state !== url.searchParams.get('state')) {
      return page(400, 'Login expired', 'Your login session expired. Please open the report again to sign in.', [clearTx]);
    }
    const res = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code', client_id: AUTH0_CLIENT_ID, client_secret: AUTH0_CLIENT_SECRET,
        code: url.searchParams.get('code') || '', redirect_uri: callback,
      }),
    });
    if (!res.ok) return page(401, 'Login failed', 'Could not complete sign in. Please try again.', [clearTx]);
    // The ID token comes straight from Auth0 over TLS in exchange for our client secret, so its claims are trusted.
    const { id_token } = await res.json();
    const claims = fromB64url(id_token.split('.')[1]);
    const roles = claims[ROLES_CLAIM] || [];
    if (!ROLE[tx.eco].some(r => roles.includes(r))) {
      const name = { fire: 'Fire', drone: 'Drone', adhesive: 'Advanced Materials, Adhesives, Bonding, Thermal Management, and Industrial Solutions', profoods: 'Food & Beverage', 'healthcare-pharma': 'Healthcare & Pharma' }[tx.eco];
      return page(403, 'No access', `Your account (${claims.email || claims.sub}) does not have access to the ${name} Ecosystem reports. Please contact Coherent Market Insights for access.`, [clearTx]);
    }
    const sess = await seal({ sub: claims.sub, email: claims.email, eco: tx.eco, exp: Date.now() + SESSION_HOURS * 3600e3 });
    // Only one Set-Cookie here: some edge proxies merge several into one header and the
    // browser would then keep just the first. The login cookie expires on its own (10 min).
    return redirect(tx.returnTo, [cookie(`cv_${tx.eco}`, sess, SESSION_HOURS * 3600)]);
  }

  if (url.pathname === '/auth/logout') {
    const eco = url.searchParams.get('eco');
    const clear = ECOS.includes(eco) ? [cookie(`cv_${eco}`, '', 0)] : ECOS.map(e => cookie(`cv_${e}`, '', 0));
    const out = new URL(`https://${AUTH0_DOMAIN}/v2/logout`);
    out.search = new URLSearchParams({ client_id: AUTH0_CLIENT_ID, returnTo: url.origin });
    return redirect(out.toString(), clear);
  }

  return redirect('/');
}

// ---------- contact lookup (SalesQL) ----------
// The report tables call this for cells that are gated in the preview. The API key
// stays server-side and only logged-in users can spend credits.
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const domainOf = v => {
  if (!v) return '';
  const s = String(v).trim().toLowerCase();
  if (s.includes('@')) return s.split('@').pop();
  return s.replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#\s]/)[0];
};

async function handleEnrich(req) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const person = String(body.person || '').trim();
  const company = String(body.company || '').trim();
  const domain = domainOf(body.domain);
  const linkedin = String(body.linkedin || '').trim();

  const q = new URLSearchParams();
  if (/linkedin\.com\/(in|sales)\//i.test(linkedin)) q.set('linkedin_url', linkedin);
  else if (person && domain) { q.set('full_name', person); q.set('organization_domain', domain); }
  else if (person && company) { q.set('full_name', person); q.set('organization_name', company); }
  // SalesQL can only look up a named person; without one there is nobody to find.
  else return json({ found: false });

  const res = await fetch(`https://api-public.salesql.com/v1/persons/enrich?${q}`, {
    headers: { Authorization: `Bearer ${process.env.SALESQL_API_KEY}` },
  });
  if (res.status === 404) return json({ found: false });
  if (!res.ok) return json({ error: 'Lookup unavailable' }, 502);

  const p = await res.json();
  const emails = (p.emails || []).filter(e => e.email && !/invalid/i.test(e.status || ''));
  const email = (emails.find(e => /work/i.test(e.type || '')) || emails[0] || {}).email || '';
  const phone = ((p.phones || []).find(x => x.phone) || {}).phone || '';
  return json({
    found: !!(email || phone || p.linkedin_url),
    name: p.full_name || '',
    title: p.title || '',
    email,
    phone,
    linkedin: p.linkedin_url || '',
  });
}

// ---------- gate ----------
export default async function middleware(req) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);

  if (parts[0] === 'auth') return handleAuth(req, url);

  // Old public links: send them to their ecosystem path so they go through the gate.
  if (parts[0] === 'shared') {
    const eco = ecoOfId(idOfSlug(parts[1] || ''));
    return eco ? redirect(`/${eco}/${parts[1]}`) : page(404, 'Not found', 'This report does not exist.');
  }

  // /healthcare&pharma and /healthcare both land on the canonical path. The
  // ampersand reaches us raw from a browser but encoded from some clients.
  const alias = ALIAS[decodeURIComponent(parts[0] || '')];
  if (alias) return redirect('/' + [alias, ...parts.slice(1)].join('/'));
  if (ECOS.includes(parts[0])) {
    const eco = parts[0];
    // A report path must belong to this ecosystem (no opening drone reports under /fire/...).
    if (parts[1] && ecoOfId(idOfSlug(parts[1])) !== eco) return page(404, 'Not found', 'This report does not exist.');
    // Every market list is browsable without a login; opening a report still needs one.
    if (!parts[1]) return next();
    return (await session(req, eco)) ? next() : redirect(loginUrl(eco, url.pathname));
  }

  if (parts[0] === 'api') {
    if (parts[1] === 'enrich') {
      for (const e of ECOS) if (await session(req, e)) return handleEnrich(req);
      return json({ error: 'Unauthorized' }, 401);
    }
    // Report data: only for the session of the report's own ecosystem.
    if (parts[1] === 'dashboards') {
      const eco = ecoOfId(parts[2]);
      if (eco && await session(req, eco)) return next();
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    for (const e of ECOS) if (await session(req, e)) return next();
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  return next();
}

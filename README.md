# Šta je ovaj projekat i čemu služi?

Projekat je jedna od mogućih implementacija Todo aplikacije koja je iskoristila React sa Typescriptom, Dotnet Core i SQLite. S obzirom na sve upotrebljeno, ovo ću nazvati "Microsoft Fanboy" stack.

Trebalo bi da korisnik može da napravi ovde nalog, da se prijavi i odjavi, i da radi CRUD operacije sa Todo-ovima.

# Kako pokrenuti ovo?

Skinete ovo kod sebe, instalirate neophodne nuget i npm pakete pokretanjem odgovarajućih komandi i terate. Ako nemate podatke u aplikaciji, Bogus paket bi trebalo da im Vam stvori pokretanjem aplikacije.

# Arhitekturna rešenja

Koristio sam react router i njegove loadere i akcije, pa sam provalio da ne mogu da im pustim access token na bezbedan način (da nisu cookies i localstorage), pa sam na pola puta to prekrpio u standardni react kod unutar komponente, koja access token uzima iz konteksta po uspešnoj prjiavi. Ekipa iza React routera voli da malo vrda sa svojim codebase-om.

Relativno skoro sam krenuo da radim dotnet core posle dugo vremena, i upotrebljavao sam Entitz framework sa anotacijama za efikasnije korišćenje baze, jer Tim Corey insistira da to može da zakrči bazu džabe, a vidim i kako. Van toga sam upotrebljavao i metode za ekstenzije za dodavanje servera, konfiguracije, itd.

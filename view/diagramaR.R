bigFive <- read.csv("../data_base/ventanaDeHonaryBigFiveRespuesta.csv")

bigFive$amabilidad[bigFive$amabilidad==0] <- NA
bigFive$neuroticismo[bigFive$neuroticismo==0] <- NA
bigFive$extraversión[bigFive$extraversión==0] <- NA
bigFive$responsabilidad[bigFive$responsabilidad==0] <- NA
bigFive$apertura[bigFive$apertura==0] <- NA

# amabilidad != 0 &
# neuroticismo != 0 &
# extraversión != 0 &
# responsabilidad != 0 &
# apertura != 0

for(lugar in unique( bigFive$entorno)){
    filtradoEntorno = subset(bigFive, entorno==lugar  ) 
    for(persona in unique( filtradoEntorno$evaluado)){
        filtradoPersona = subset(bigFive, evaluado==persona  )
        # extraversión!= 0,responsabilidad!= 0,apertura!= 0 
        # filtradoPersona = filtradoPersona[filtradoPersona$neuroticismo != 0]
        direccionGuardarImagen = paste("../public/imagenes","/diagrama ",lugar," ", persona,".png",sep="")
        png(direccionGuardarImagen)
        c("amabilidad","neuroticismo","extraversión","responsabilidad","apertura")
        print(persona)
        print(filtradoPersona[5:9])
        par(mfrow=c(3,1)) 
        boxplot(filtradoPersona[5:9],main=paste("Diagrama ",lugar," ", persona),  xlab = "Factores de personalidad", ylab = "pesos",
        # horizontal = TRUE,
        cex.axis=0.8,
         las=1,
        cex.lab=1.5
        )
        opinionOtros = subset(filtradoPersona, evaluador != persona )
        print(opinionOtros[5:9])
        boxplot(opinionOtros[5:9],main=paste("Opinion otros ",lugar," ", persona),  xlab = "Factores de personalidad", ylab = "pesos",
        # horizontal = TRUE,
        cex.axis=0.8,
        las=1,
        cex.lab=1.5
        )
                opinionPropia = subset(filtradoPersona, evaluador == persona )
        print(opinionPropia[5:9])
        if(nrow(opinionPropia[5:9])){
            boxplot(opinionPropia[5:9],main=paste("Opinion propia ",lugar," ", persona),  xlab = "Factores de personalidad", ylab = "pesos",
            # horizontal = TRUE,
            cex.axis=0.8,
            las=1,
            cex.lab=1.5
            )
        }
        dev.off()
    }
}

<template>
    <v-container>
        <Info :idAtor="$route.params.id"/>
        <FilmesAtor :idAtor="$route.params.id"/>
        <v-layout>
            <v-btn color="info" @click="$router.go(-1)">
                Voltar à página anterior
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
import Info from '@/components/Info'
import FilmesAtor from '@/components/FilmesAtor'

export default {
  components: {
    Info, FilmesAtor
  }
}
</script>

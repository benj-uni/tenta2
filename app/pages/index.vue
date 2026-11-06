<template>
    <div class="min-h-screen bg-default text-default flex flex-col font-sans">

        <main class="flex-1">
            <section class="py-8 sm:py-12 bg-brand-gradient border-b border-muted">
                <UContainer>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                        <div class="flex flex-col items-start">
                            <UBadge color="primary" variant="subtle"
                                class="mb-3 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full">
                                Pastelería & Repostería Artesanal
                            </UBadge>

                            <h1
                                class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-highlighted leading-tight max-w-md sm:max-w-lg">
                                El sabor artesanal que te tienta cada día
                            </h1>

                            <p class="mt-4 text-base sm:text-lg text-muted max-w-xl leading-relaxed text-justify">
                                Tortas para ocasiones especiales, pastelería fina y bollería horneada con los mejores
                                ingredientes y la máxima dedicación.
                            </p>

                            <div class="mt-6">
                                <UButton to="/productos" size="lg" color="primary"
                                    class="font-semibold px-6 shadow-sm hover:scale-[1.01] transition-transform">
                                    Explorar Productos
                                </UButton>
                            </div>
                        </div>

                        <div
                            class="bg-elevated/70 border border-default rounded-2xl p-6 sm:p-7 shadow-xs backdrop-blur-xs flex flex-col w-full">
                            <div
                                class="w-full aspect-4/3 rounded-xl overflow-hidden border border-default bg-accented/30 shadow-xs flex items-center justify-center relative group">
                                <img src="/images/torta_A.jpg" alt="Pastelería artesanal"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                                <div
                                    class="hidden absolute inset-0 flex-col items-center justify-center text-muted gap-2 p-4 text-center bg-accented/40">
                                    <UIcon name="i-heroicons-photo" class="w-10 h-10 text-primary" />
                                    <span class="text-sm font-medium">Foto de la Pastelería</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </UContainer>

                <section class="mt-20 border-t border-default/60 pt-16 pb-12">
                    <div class="max-w-2xl mx-auto text-center space-y-6">

                        <div class="space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-primary">
                                Hablemos
                            </span>
                            <h2 class="text-3xl font-extrabold tracking-tight text-highlighted sm:text-4xl">
                                Contactanos
                            </h2>
                            <p class="text-sm text-muted max-w-md mx-auto">
                                ¿Tienes dudas, pedidos especiales o necesitas cotizar para un evento? Escríbenos
                                directamente a través de nuestros canales oficiales.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

                            <a href="https://instagram.com/tenta2" target="_blank" rel="noopener noreferrer"
                                class="group p-5 rounded-2xl border border-default bg-elevated/40 hover:bg-elevated hover:border-primary/50 transition-all duration-200 flex items-center gap-4 text-left shadow-xs">
                                <div
                                    class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                    <UIcon name="i-simple-icons-instagram" class="w-6 h-6" />
                                </div>
                                <div>
                                    <p class="text-xs text-muted font-medium">Síguenos en Instagram</p>
                                    <p
                                        class="text-base font-bold text-highlighted group-hover:text-primary transition-colors">
                                        @tenta2
                                    </p>
                                </div>
                            </a>

                            <a href="mailto:contacto@tenta2.cl"
                                class="group p-5 rounded-2xl border border-default bg-elevated/40 hover:bg-elevated hover:border-primary/50 transition-all duration-200 flex items-center gap-4 text-left shadow-xs">
                                <div
                                    class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                    <UIcon name="i-heroicons-envelope" class="w-6 h-6" />
                                </div>
                                <div>
                                    <p class="text-xs text-muted font-medium">Escríbenos un correo</p>
                                    <p
                                        class="text-base font-bold text-highlighted group-hover:text-primary transition-colors">
                                        contacto@tenta2.cl
                                    </p>
                                </div>
                            </a>

                        </div>

                    </div>
                </section>
            </section>
        </main>
    </div>

</template>
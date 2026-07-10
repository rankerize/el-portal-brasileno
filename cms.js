/**
 * El Portal Brasileño - Headless WordPress CMS Connector
 * Maneja las peticiones a la API de WordPress con respaldo a datos locales.
 */

const CMS = {
  // CONFIGURACIÓN: Ingresa la URL base de tu WordPress REST API aquí (ej: 'https://tusitio.com/wp-json')
  // Déjalo vacío ('') para utilizar la base de datos local de respaldo.
  WP_API_URL: '',

  // Base de datos de respaldo (Local Fallback)
  local: {
    // Categorías del Menú
    categories: [
      { slug: 'sandwiches', name: 'Sándwiches Premium' },
      { slug: 'hamburguesas', name: 'Hamburguesas' },
      { slug: 'perros', name: 'Perros Calientes' },
      { slug: 'especiales', name: 'Platos & Especiales' },
      { slug: 'carnes-frias', name: 'Carnes Frías La Brasileña' }
    ],

    // Sedes del Restaurante
    sedes: [
      {
        id: 'subazar',
        name: 'Sede Subazar',
        address: 'Centro Comercial Subazar, Local 91-92 (Carrera 91 # 145-83, Suba, Bogotá)',
        phone: '305 9248921',
        hours: [
          'Martes a Jueves: 11:00 a.m. - 8:15 p.m.',
          'Viernes y Sábado: 11:15 a.m. - 9:30 p.m.',
          'Domingo: 9:00 a.m. - 5:45 p.m.',
          'Lunes: Cerrado'
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2235940381666!2d-74.0934106!3d4.7311743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f85072eb0f171%3A0xe96323cfb841753c!2sC.C.%20Subazar!5e0!3m2!1ses-419!2sco!4v1720540000000'
      },
      {
        id: 'ciudad-montes',
        name: 'Sede Ciudad Montes',
        address: 'Carrera 50 # 18-03 Sur, Ciudad Montes, Tercer Sector, Bogotá',
        phone: '305 9248921',
        hours: [
          'Martes a Jueves: 11:00 a.m. - 8:15 p.m.',
          'Viernes y Sábado: 11:15 a.m. - 9:30 p.m.',
          'Domingo: 9:00 a.m. - 5:45 p.m.',
          'Lunes: Cerrado'
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.97451245642!2d-74.1167421!3d4.6033423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9937b2d56a29%3A0x6b4fbde0345bf923!2sCra.%2050%20%2318-03%20Sur%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1720540000000'
      }
    ],

    // Promociones Activas (Banners)
    promos: [
      {
        title: '¡Combo Futbolero! ⚽',
        subtitle: 'Pide hoy tu combo favorito de sándwich o hamburguesa y reclama tu Raspa y Gana virtual',
        badge: 'Campaña Oficial',
        bgGradient: 'linear-gradient(135deg, hsl(0, 0%, 15%) 0%, hsl(0, 0%, 7%) 100%)'
      }
    ],

    // Productos de El Portal Brasileño (Menú + Carnes Frías)
    products: [
      {
        id: 1,
        name: 'Sándwich Especial en Pan de Queso',
        category: 'sandwiches',
        price: 18500,
        desc: 'Un pan artesanal alargado con una costra dorada de queso parmesano y gratinado. Relleno de abundante jamón artesanal de pierna (en rebanadas gruesas), lechuga crespa fresca, rodajas de tomate y terminado con queso rallado fino.',
        image: 'productos fotos/unnamed (2).webp',
        badge: 'El más vendido',
        healthy: 'Jamón bajo en sodio'
      },
      {
        id: 2,
        name: 'Sándwich en Pan Focaccia con Tomates',
        category: 'sandwiches',
        price: 19000,
        desc: 'Pan focaccia rectangular horneado con rodajas de tomate rústico y finas hierbas en la corteza superior. Relleno de finas lonjas de jamón seleccionado de máxima calidad, queso blanco derretido y lechuga crespa fresca.',
        image: 'productos fotos/unnamed.webp',
        badge: 'Premium',
        healthy: 'Vegetales frescos del día'
      },
      {
        id: 3,
        name: 'Sándwich Clásico en Pan Roll',
        category: 'sandwiches',
        price: 13500,
        desc: 'Pan blando tipo roll, relleno de múltiples capas de jamón premium seleccionado de alta calidad, queso tajado, rodajas de tomate fresco y una cama de lechuga verde crespa.',
        image: 'productos fotos/unnamed (3).webp',
        badge: 'Clásico',
        healthy: 'Procesos limpios'
      },
      {
        id: 4,
        name: 'Salchipapa Especial "El Portal"',
        category: 'especiales',
        price: 24500,
        desc: 'Base de papas a la francesa crujientes, salchicha premium picada (con cortes en cruz dorados), tocineta crujiente, carne/pollo desmechado, una generosa cobertura de queso rallado fino, lechuga en un costado y salsa rosada de la casa.',
        image: 'productos fotos/unnamed (1).webp',
        badge: 'Para compartir',
        healthy: 'Ingredientes seleccionados'
      },
      {
        id: 5,
        name: 'Hamburguesa Tradicional',
        category: 'hamburguesas',
        price: 17000,
        desc: 'Carne seleccionada de alta calidad en pan brioche con ajonjolí negro, queso fundido, lechuga fresca, rodajas de tomate y salsa especial de la casa.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
        badge: 'Tradicional',
        healthy: 'Carne 100% de res'
      },
      {
        id: 6,
        name: 'Hamburguesa Brasileña',
        category: 'hamburguesas',
        price: 22000,
        desc: 'Carne seleccionada en pan brioche con ajonjolí negro, queso, vegetales frescos y la emblemática salsa especial brasileña.',
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80',
        badge: 'Especialidad',
        healthy: 'Receta Brasileña'
      },
      {
        id: 7,
        name: 'Hamburguesa Portal',
        category: 'hamburguesas',
        price: 19700,
        desc: 'Carne seleccionada, pan brioche con ajonjolí negro, lechuga fresca, tomate, queso fundido, tocineta crujiente y salsas especiales de la casa.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
        badge: 'Favorito',
        healthy: 'Frescura garantizada'
      },
      {
        id: 8,
        name: 'Hamburguesa Doble Carne',
        category: 'hamburguesas',
        price: 28200,
        desc: 'Doble porción de carne seleccionada de la casa, doble queso fundido, tocineta, lechuga crespa fresca y tomate en pan brioche con ajonjolí negro.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
        badge: 'Gigante',
        healthy: 'Doble sabor premium'
      },
      {
        id: 9,
        name: 'Hamburguesa Clásica',
        category: 'hamburguesas',
        price: 14100,
        desc: 'Carne de res seleccionada de excelente calidad, pan brioche con ajonjolí negro, queso fundido y vegetales frescos del día.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
        badge: 'Económica',
        healthy: 'Calidad al mejor precio'
      },
      {
        id: 10,
        name: 'Perro Brasileño',
        category: 'perros',
        price: 19500,
        desc: 'Pan tierno relleno de salchicha tipo americana, queso fundido, tocineta picada crujiente, papas cabello de ángel y salsa de la casa.',
        image: 'https://images.unsplash.com/photo-1627059318426-472082298e69?w=600&q=80',
        badge: 'Popular',
        healthy: 'Embutidos premium'
      },
      {
        id: 11,
        name: 'Perro Americano',
        category: 'perros',
        price: 14500,
        desc: 'Perro clásico con salchicha tipo americana seleccionada, queso fundido y hilos de salsas tradicionales.',
        image: 'https://images.unsplash.com/photo-1541232901907-e94ec7b84d3e?w=600&q=80',
        badge: 'Clásico',
        healthy: 'Tradicional'
      },
      {
        id: 12,
        name: 'Perro Boyacense',
        category: 'perros',
        price: 18500,
        desc: 'Salchicha seleccionada, longaniza artesanal picada en trozos dorados, queso fundido y salsas locales de la casa.',
        image: 'https://images.unsplash.com/photo-1627059318426-472082298e69?w=600&q=80',
        badge: 'Estilo Local',
        healthy: 'Sabor de origen'
      },
      // Carnes Frías La Brasileña
      {
        id: 13,
        name: 'Jamón Ahumado (500g)',
        category: 'carnes-frias',
        price: 18500,
        desc: 'Producto elaborado a base de carne de cerdo seleccionada, ahumado artesanalmente, listo para consumir en rebanadas o cubos.',
        image: 'la-brasilena/jamones_2.jpg',
        badge: 'Recomendado',
        healthy: 'Ahumado natural'
      },
      {
        id: 14,
        name: 'Jamón Pullman (500g)',
        category: 'carnes-frias',
        price: 16900,
        desc: 'Producto elaborado a base de pura carne de cerdo de excelente calidad, listo para consumir. Ideal para sándwiches diarios.',
        image: 'la-brasilena/jamones_4.png',
        badge: 'Clásico',
        healthy: 'Bajo en grasa'
      },
      {
        id: 15,
        name: 'Jamón de Pollo (500g)',
        category: 'carnes-frias',
        price: 17500,
        desc: 'Producto suave y ligero elaborado con carne 100% de pollo seleccionada, listo para consumir.',
        image: 'la-brasilena/jamones_7.jpg',
        badge: 'Ligero',
        healthy: 'Bajo en sodio'
      },
      {
        id: 16,
        name: 'Jamón Casero Premium (500g)',
        category: 'carnes-frias',
        price: 21000,
        desc: 'Jamón especial de cerdo con receta casera tradicional, excelente sabor y calidad de charcutería fina.',
        image: 'la-brasilena/jamones_9.png',
        badge: 'Premium',
        healthy: 'Artesanal'
      },
      {
        id: 17,
        name: 'Jamón de Pavo (500g)',
        category: 'carnes-frias',
        price: 22500,
        desc: 'Producto mixto premium de pavo y pollo, de textura suave y sabor balanceado, listo para consumir.',
        image: 'la-brasilena/jamones_10.png',
        badge: 'Fit',
        healthy: 'Alto en proteína'
      },
      {
        id: 18,
        name: 'Jamón Cubano Ahumado (500g)',
        category: 'carnes-frias',
        price: 19500,
        desc: 'Delicioso jamón mixto de cerdo y res con ahumado característico del caribe, listo para consumir.',
        image: 'la-brasilena/jamones_11.jpg',
        badge: 'Sabor Intenso',
        healthy: 'Ahumado artesanal'
      },
      {
        id: 19,
        name: 'Jamón Cubano Tradicional (500g)',
        category: 'carnes-frias',
        price: 18900,
        desc: 'Jamón mixto de cerdo y res seleccionado, de receta tradicional cubana, listo para consumir.',
        image: 'la-brasilena/jamones_12.jpg',
        badge: 'Tradicional',
        healthy: 'Ingredientes seleccionados'
      },
      {
        id: 20,
        name: 'Jamón York Especial (500g)',
        category: 'carnes-frias',
        price: 21900,
        desc: 'Producto elaborado a base de carne de cerdo de la más alta calidad, ahumado suavemente, listo para consumir.',
        image: 'la-brasilena/jamones_14.png',
        badge: 'Fino',
        healthy: 'Procesamiento limpio'
      },
      {
        id: 21,
        name: 'Salchicha Suiza Premium (500g)',
        category: 'carnes-frias',
        price: 16500,
        desc: 'Producto mixto de res y cerdo de gran tamaño y sabor sazonado. Se recomienda sofreír, asar o escaldar.',
        image: 'la-brasilena/embutidos_1.jpg',
        badge: 'Para Asar',
        healthy: 'Sabor tradicional'
      },
      {
        id: 22,
        name: 'Salchicha Granjera (500g)',
        category: 'carnes-frias',
        price: 14800,
        desc: 'Producto mixto de res y cerdo seleccionado, ideal para acompañar tus platos rápidos caseros o asados.',
        image: 'la-brasilena/embutidos_3.png',
        badge: 'Versátil',
        healthy: 'Carne seleccionada'
      },
      {
        id: 23,
        name: 'Salchicha Superbras (500g)',
        category: 'carnes-frias',
        price: 13900,
        desc: 'Producto mixto de pollo y res, tamaño ideal para preparar deliciosos perros calientes en casa.',
        image: 'la-brasilena/embutidos_5.png',
        badge: 'Ideal Perros',
        healthy: 'Baja en grasa'
      },
      {
        id: 24,
        name: 'Salchicha Brasidog (500g)',
        category: 'carnes-frias',
        price: 12500,
        desc: 'Salchicha seleccionada de pollo y res para uso diario. Luego de abierto consúmase en el menor tiempo posible.',
        image: 'la-brasilena/embutidos_6.png',
        badge: 'Económica',
        healthy: 'Práctica'
      },
      {
        id: 25,
        name: 'Salchicha Manguera Tradicional',
        category: 'carnes-frias',
        price: 11900,
        desc: 'Producto mixto de pollo y res útil en variedad de platos tradicionales colombianos, excelente rendimiento.',
        image: 'la-brasilena/embutidos_8.png',
        badge: 'Familiar',
        healthy: 'Rendidora'
      },
      {
        id: 26,
        name: 'Chorizo Coctel (500g)',
        category: 'carnes-frias',
        price: 17800,
        desc: 'Producto mixto de res y cerdo con sabor natural de chorizo parrillero. Tamaño ideal para picadas y reuniones.',
        image: 'la-brasilena/embutidos_9.png',
        badge: 'Para Picadas',
        healthy: 'Sabor natural'
      },
      {
        id: 27,
        name: 'Chorizo Español Especial (500g)',
        category: 'carnes-frias',
        price: 19800,
        desc: 'Chorizo de receta tradicional española elaborado con carnes de res y cerdo seleccionadas y pimentón premium.',
        image: 'la-brasilena/embutidos_10.png',
        badge: 'Especialidad',
        healthy: 'Condimentado natural'
      },
      {
        id: 28,
        name: 'Cabano Tradicional (x10 unidades)',
        category: 'carnes-frias',
        price: 15500,
        desc: 'Delicioso embutido seco mixto de res y cerdo, ideal para consumir directamente como snack o merienda.',
        image: 'la-brasilena/embutidos_12.png',
        badge: 'Snack',
        healthy: 'Listo para comer'
      },
      {
        id: 29,
        name: 'Mortadela Familiar (500g)',
        category: 'carnes-frias',
        price: 10500,
        desc: 'Producto elaborado a base de carne de pollo y condimentos seleccionados. Sabor suave y excelente textura.',
        image: 'la-brasilena/embutidos_13.png',
        badge: 'Rendidor',
        healthy: 'Suave sabor'
      },
      {
        id: 30,
        name: 'Salchichón Cervecero (500g)',
        category: 'carnes-frias',
        price: 12900,
        desc: 'Producto mixto tradicional de pollo y res, sabor sazonado ideal para compartir en tardes de amigos.',
        image: 'la-brasilena/embutidos_14.png',
        badge: 'Para Compartir',
        healthy: 'Sabor local'
      },
      {
        id: 31,
        name: 'Jamón Pernil Horneado (500g)',
        category: 'carnes-frias',
        price: 24500,
        desc: 'Especialidad de cerdo horneada artesanalmente, lista para consumir. No contiene nitritos añadidos.',
        image: 'la-brasilena/especialidades_2.png',
        badge: 'Sin Nitritos',
        healthy: '100% natural'
      },
      {
        id: 32,
        name: 'Pernil de Cerdo Especial (500g)',
        category: 'carnes-frias',
        price: 23500,
        desc: 'Elaborado con la pierna de cerdo seleccionada y finas especias. Listo para consumir y libre de nitritos.',
        image: 'la-brasilena/especialidades_4.png',
        badge: 'Saludable',
        healthy: 'Libre de químicos'
      },
      {
        id: 33,
        name: 'Galantina de la Casa (500g)',
        category: 'carnes-frias',
        price: 25000,
        desc: 'Producto cárnico mixto elaborado a base de carne de cerdo, pollo y res con aceitunas y pimentones, listo para consumir.',
        image: 'la-brasilena/especialidades_6.jpg',
        badge: 'Festivo',
        healthy: 'Bajo en grasa'
      },
      {
        id: 34,
        name: 'Lomo de Cerdo Curado (500g)',
        category: 'carnes-frias',
        price: 26000,
        desc: 'Lomo de cerdo magro horneado con condimentos especiales, ideal para rebanar y servir frío o caliente.',
        image: 'la-brasilena/especialidades_8.jpg',
        badge: 'Magro',
        healthy: 'Alto en proteína'
      },
      {
        id: 35,
        name: 'Pavo Relleno Navideño (500g)',
        category: 'carnes-frias',
        price: 28900,
        desc: 'Exquisito producto cárnico mixto elaborado con carne seleccionada de pavo, pollo y ternera con frutos secos.',
        image: 'la-brasilena/especialidades_12.png',
        badge: 'Gourmet',
        healthy: 'Bajo en calorías'
      },
      {
        id: 36,
        name: 'Tocineta Premium Ahumada (250g)',
        category: 'carnes-frias',
        price: 12500,
        desc: 'Elaborada con el costillar seleccionado del cerdo y ahumado natural. Requiere preparación para dorar al gusto.',
        image: 'la-brasilena/variedades_3.jpg',
        badge: 'Sabor Crujiente',
        healthy: 'Ahumado natural'
      },
      {
        id: 37,
        name: 'Tocineta Moldeada (250g)',
        category: 'carnes-frias',
        price: 10900,
        desc: 'Elaborada con carne de cerdo seleccionada para menor contenido de grasa, requiere preparación para servir.',
        image: 'la-brasilena/variedades_4.png',
        badge: 'Menos Grasa',
        healthy: 'Bajo contenido calórico'
      },
      {
        id: 38,
        name: 'Hamburguesa de Res La Brasileña (x6)',
        category: 'carnes-frias',
        price: 19900,
        desc: 'Carne moldeada para hamburguesa a base de res con toques de pollo y cerdo. Listo para asar por 4 minutos por lado.',
        image: 'la-brasilena/variedades_7.png',
        badge: 'Packs Listos',
        healthy: 'Fácil preparación'
      }
    ]
  },

  // LLAMADAS API CON FALLBACK LOCAL

  /**
   * Obtiene la lista de productos
   */
  async getProducts() {
    if (!this.WP_API_URL) {
      return this.local.products;
    }
    try {
      // Intentamos llamar a la API de WordPress (Custom Post Type "productos" o Woocommerce Products)
      // Ajustable según la estructura instalada en WP (ver wordpress-config-guia.md)
      const response = await fetch(`${this.WP_API_URL}/wp/v2/productos?per_page=100`);
      if (!response.ok) throw new Error('API response not OK');
      const wpData = await response.json();
      
      // Mapeamos los campos del JSON de WordPress a los campos esperados por la UI
      return wpData.map(post => ({
        id: post.id,
        name: post.title.rendered,
        category: post.acf?.categoria || post.categories_names?.[0] || 'sandwiches',
        price: parseInt(post.acf?.precio) || 0,
        desc: post.acf?.descripcion || post.content.rendered.replace(/<[^>]*>/g, ''),
        image: post.acf?.imagen || post.featured_media_src_url || 'productos fotos/unnamed.webp',
        badge: post.acf?.badge || '',
        healthy: post.acf?.healthy || ''
      }));
    } catch (error) {
      console.warn('WP API Error (Productos): Usando base de datos local de respaldo.', error);
      return this.local.products;
    }
  },

  /**
   * Obtiene la lista de categorías
   */
  async getCategories() {
    if (!this.WP_API_URL) {
      return this.local.categories;
    }
    try {
      const response = await fetch(`${this.WP_API_URL}/wp/v2/categories`);
      if (!response.ok) throw new Error('API response not OK');
      const wpData = await response.json();
      return wpData.map(cat => ({
        slug: cat.slug,
        name: cat.name
      }));
    } catch (error) {
      console.warn('WP API Error (Categorías): Usando base de datos local de respaldo.', error);
      return this.local.categories;
    }
  },

  /**
   * Obtiene la información de contacto y sedes
   */
  async getSedes() {
    if (!this.WP_API_URL) {
      return this.local.sedes;
    }
    try {
      const response = await fetch(`${this.WP_API_URL}/wp/v2/sedes?per_page=10`);
      if (!response.ok) throw new Error('API response not OK');
      const wpData = await response.json();
      
      return wpData.map(post => ({
        id: post.slug,
        name: post.title.rendered,
        address: post.acf?.direccion || '',
        phone: post.acf?.telefono || '305 9248921',
        hours: post.acf?.horarios ? post.acf.horarios.split('\n') : [],
        mapUrl: post.acf?.mapa_embed || ''
      }));
    } catch (error) {
      console.warn('WP API Error (Sedes): Usando información de sedes local.', error);
      return this.local.sedes;
    }
  },

  /**
   * Obtiene banners de promociones activos
   */
  async getPromotions() {
    if (!this.WP_API_URL) {
      return this.local.promos;
    }
    try {
      // Trae los posts filtrados bajo la categoría de 'promociones'
      const response = await fetch(`${this.WP_API_URL}/wp/v2/posts?categories=promociones`);
      if (!response.ok) throw new Error('API response not OK');
      const wpData = await response.json();
      
      return wpData.map(post => ({
        title: post.title.rendered,
        subtitle: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
        badge: post.acf?.badge || 'Promoción',
        bgGradient: post.acf?.gradiente_fondo || 'linear-gradient(135deg, hsl(0, 0%, 15%) 0%, hsl(0, 0%, 7%) 100%)'
      }));
    } catch (error) {
      console.warn('WP API Error (Promociones): Usando banners locales.', error);
      return this.local.promos;
    }
  }
};

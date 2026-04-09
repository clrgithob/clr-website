import fs from 'fs';
import path from 'path';
import ClientPage from './ClientPage';

export default function Home() {
  const catalogDir = path.join(process.cwd(), 'public', 'catalog');
  let categories = [];

  const defaultCategories = [
    "Welding Machines",
    "Personal Protective Equipment (PPE)",
    "Scaffolding",
    "Power Tools",
    "Welding Gloves",
    "Air Compressors"
  ];

  if (!fs.existsSync(catalogDir)) {
    fs.mkdirSync(catalogDir, { recursive: true });
    defaultCategories.forEach(cat => {
      fs.mkdirSync(path.join(catalogDir, cat), { recursive: true });
    });
  }

  const folders = fs.readdirSync(catalogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  folders.forEach(folder => {
    const folderPath = path.join(catalogDir, folder);
    const folderContents = fs.readdirSync(folderPath, { withFileTypes: true });

    let sections = [];
    let coverImage = "";
    let generalItems = [];

    // --- NEW: Read category description if it exists ---
    let categoryDescription = "";
    const catDescPath = path.join(folderPath, 'description.txt');
    if (fs.existsSync(catDescPath)) {
      categoryDescription = fs.readFileSync(catDescPath, 'utf8');
    } else if (folder === "Air Compressors") {
      // Your requested 5-line description for Air Compressors
      categoryDescription = "Reliable pneumatic power systems for efficient coating, painting, and continuous tool operation.\nWe provide high-capacity, rapid-recovery air compressors for demanding commercial workflows.\nOur inventory includes stationary units, portable job-site compressors, and specialized hoses.\nBuilt to deliver consistent CFM and PSI to keep your production lines moving.\nEquip your facility with the industry's most trusted pneumatic power sources.";
    } else {
      categoryDescription = `Browse our complete inventory of ${folder}. Click to view available specifications and images.`;
    }

    folderContents.filter(dirent => dirent.isFile()).forEach(fileDirent => {
      const file = fileDirent.name;
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const baseName = path.parse(file).name;
        const txtPath = path.join(folderPath, `${baseName}.txt`);
        
        let description = "No description provided.";
        if (fs.existsSync(txtPath)) {
          description = fs.readFileSync(txtPath, 'utf8');
        }

        generalItems.push({
          id: baseName,
          imagePath: `/catalog/${folder}/${file}`,
          description: description
        });

        if (!coverImage) coverImage = `/catalog/${folder}/${file}`;
      }
    });

    if (generalItems.length > 0) {
      sections.push({ title: "General", items: generalItems });
    }

    folderContents.filter(dirent => dirent.isDirectory()).forEach(subDirDirent => {
      const subDir = subDirDirent.name;
      const subDirPath = path.join(folderPath, subDir);
      const subFiles = fs.readdirSync(subDirPath);

      let subItems = [];
      
      subFiles.forEach(file => {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          const baseName = path.parse(file).name;
          const txtPath = path.join(subDirPath, `${baseName}.txt`);
          
          let description = "No description provided.";
          if (fs.existsSync(txtPath)) {
            description = fs.readFileSync(txtPath, 'utf8');
          }

          subItems.push({
            id: `${subDir}-${baseName}`,
            imagePath: `/catalog/${folder}/${subDir}/${file}`,
            description: description
          });

          if (!coverImage) coverImage = `/catalog/${folder}/${subDir}/${file}`;
        }
      });

      if (subItems.length > 0) {
        sections.push({ title: subDir, items: subItems });
      }
    });

    let totalItems = 0;
    sections.forEach(sec => {
      totalItems += sec.items.length;
    });

    categories.push({
      id: folder,
      title: folder,
      coverImage: coverImage,
      description: categoryDescription,
      totalItems: totalItems,
      sections: sections
    });
  });

  return <ClientPage categories={categories} />;
}
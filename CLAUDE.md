# Instructions pour Claude

## Skills

**TOUJOURS consulter le dossier `.skills/` au début de chaque tâche.**

Ce dossier contient des skills réutilisables (déploiement FTP, publication GitHub, etc.). Avant d'exécuter une action, vérifier si une skill existe déjà.

```bash
ls -la .skills/
```

## Architecture projet

- `web/` : Site (HTML, CSS, JS vanilla) - directement déployable
- `.skills/` : Lien symbolique vers les skills partagées
- Pas de build, pas de node_modules

## Déploiement OVH

Utiliser la skill `skill_FTP_OVH_deploy.md` pour déployer `web/` sur OVH.

## Principes

- Vanilla JS uniquement (pas de Vite, pas de node_modules)
- Structure simple et lisible
- Fichiers directement déployables sans build

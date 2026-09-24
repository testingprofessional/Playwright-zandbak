Algemene architectuur

| Laag            | Verantwoordelijkheid                                            |
| --------------- | --------------------------------------------------------------- |
| **Page Object** | UI-interactie + validatie van expliciete toestandsveranderingen |
| **Workflow**    | Meerdere Page Objects combineren tot een gebruikersproces       |
| **Test**        | Bepaalt wat het proces uiteindelijk moet bewijzen               |

| Onderdeel   | Verantwoordelijkheid                         |
| ----------- | -------------------------------------------- |
| Test        | **Wat** wil ik testen?                       |
| UserFactory | **Welke user** moet ik creëren?              |
| API Client  | **Hoe communiceer ik technisch met de API?** |
| Page Object | **Hoe communiceer ik met de UI?**            |
| Workflow    | **Welke business flow voer ik uit?**         |

API testing:
                 ┌─────────────────┐
                 │      TEST       │
                 └────────┬────────┘
                          │
                 gebruikt userFactory
                          │
                 ┌────────▼────────┐
                 │  UserFactory    │
                 │   WAT / data    │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ UserApiClient   │
                 │ user API        │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │    ApiClient    │
                 │   HTTP-techiek  │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ APIRequestCtx   │
                 └─────────────────┘

        Fixture
        ├── vóór use() → user aanmaken
        └── na use()  → user opruimen


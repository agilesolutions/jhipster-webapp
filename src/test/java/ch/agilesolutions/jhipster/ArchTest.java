package ch.agilesolutions.jhipster;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ch.agilesolutions.jhipster");

        noClasses()
            .that()
                .resideInAnyPackage("ch.agilesolutions.jhipster.service..")
            .or()
                .resideInAnyPackage("ch.agilesolutions.jhipster.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..ch.agilesolutions.jhipster.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
